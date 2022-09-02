import { ConflictException, Injectable } from '@nestjs/common';

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
  getClient(body: { facility: string; id: string }) {
    if (body.id === '152010221845') {
      return samplePayload;
    } else {
      throw new ConflictException(sampleError);
    }
    // return body;
  }
}
