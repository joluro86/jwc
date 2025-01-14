// Update a Firestore document in an API Route
import { Firestore } from '@google-cloud/firestore';
const firestore = new Firestore();

export default async (req, res) => {
  const { docId, age } = req.body;
  try {
    const result = await firestore.collection('users').doc(docId).update({ age });
    res.status(200).json({ success: true, id: docId, updatedFields: { age } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
};