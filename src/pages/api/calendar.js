import AWS from 'aws-sdk';
import { getToken } from 'next-auth/jwt';


// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();


// Secret for JWT decoding, ensure this matches your configuration
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {

  console.log('API handler reached');

  if (req.method === 'GET') {
    try {
      // Retrieve token from request
      const token = await getToken({ req, secret: JWT_SECRET.toString() });
      console.log('Token:', token);

      const personId = token.email;
      console.log('personId is:', personId);

      // Retrieve events from DynamoDB
      const params = {
        TableName: 'WorkSession',
        Key: { personId }
      };

      const data = await dynamodb.get(params).promise();
      console.log('Data retrieved:', data);

      if (!data.Item) {
        return res.status(404).json({ error: 'No events found for this personId' });
      }

      res.status(200).json({ events: data.Item.events });
    } catch (error) {
      console.error('Error retrieving events from DynamoDB:', error);
      res.status(500).json({ error: 'Error retrieving events', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
