import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { config } from './config/.config';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import { firstValueFrom } from 'rxjs';

const samplePayload = {
  message_type: 'success',
  sent_id: '152010221845',
  insurance_details: [
    {
      product_name: 'Primary & Referral',
      expiry_date: '',
      status: 'I',
      ded_type: null,
      ded1: null,
      ded2: null,
      ceiling1: null,
      ceiling2: null,
      productCode: '0075PS',
    },
  ],
  photo_path: 'https://image-storage-url/client_id.jpg',
  firstname: 'Haji',
  middlename: 'Gora',
  lastname: 'Haji',
  othername: 'Uchebe',
  sex: 'Male',
  dob: '1990-03-15',
  address: {
    region: 'Kusini Pemba',
    district: 'Mkoani',
    shehia: 'Tundauwa',
  },
  place_of_birth: {
    region: 'Mjini Kati Unguja',
    district: 'Mjini',
  },
  country_code: '255',
  phone_number: '0754886287',
  family_linkages: {
    id: '87654321',
    source_of_id: 'ZAN_ID',
    type_of_linkage: 'Parent',
  },
  other_linkages: {
    id: '12345678',
    source_of_id: 'ZAN_ID',
    type_of_linkage: 'Spouse',
  },
};

const sampleError = {
  message_type: 'failure',
  sent_id: '983402403094',
  error_message: 'The sent ID is not a valid OpenIMIS ID, please correct it.',
};
@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  async getClient(body: { facility: string; id: string }, authHeader: string) {
    const url = config.openimis_test_url;
    try {
      const token = await this.getToken(authHeader);
      const headers = { Authorization: `Bearer ${token}` };
      const response = await firstValueFrom(
        this.http.get(`${url}/insuree/${body.id}/enquire`, { headers }),
      );
      return this.getResponseBody(response.data, body.id);
    } catch (e) {
      if (e?.response) {
        if (e?.response?.status == 401) {
          throw new UnauthorizedException();
        } else if (e?.response?.status == 404) {
          throw new NotFoundException({
            message_type: 'failure',
            sent_id: body.id,
            error_message:
              'The sent ID is not a valid OpenIMIS ID, please correct it.',
          });
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }

  getResponseBody(data: any, id: string) {
    const insurance_details = data['details'];
    const otherDetails = { ...data };
    delete otherDetails['details'];
    return {
      message_type: 'success',
      sent_id: id,
      insurance_details,
      ...otherDetails,
    };
  }

  async getToken(authHeader: string) {
    try {
      let token = '';
      const url = config.openimis_test_url;
      const authToken = authHeader.substring('Basic '.length).trim();
      const decoded = Buffer.from(authToken, 'base64').toString();
      const credentials = decoded.split(':');
      const username = credentials[0];
      const password = credentials[1];
      const loginPayload = {
        username,
        password,
      };
      const tokenCredentialsRaw = fs.readFileSync('credentials.json');
      if (tokenCredentialsRaw) {
        const tokenCredentials = JSON.parse(tokenCredentialsRaw.toString());
        const today = new Date();
        const expiredDate = new Date(tokenCredentials['expires_on']);
        if (tokenCredentials['access_token'] && today < expiredDate) {
          token = tokenCredentials['access_token'];
        } else {
          const response = await firstValueFrom(
            this.http.post(`${url}/login`, loginPayload),
          );
          const loginAccess = response.data;
          token = loginAccess['access_token'];
          fs.writeFileSync('credentials.json', JSON.stringify(loginAccess));
        }
      }
      return token;
    } catch (e) {
      throw e;
    }
  }
}
