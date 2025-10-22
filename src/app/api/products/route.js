
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

//get all products
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
    const products = await db.collection(process.env.PRODUCTS_COLLECTION).find({}).toArray();

    return Response.json(products);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
//post a product
export async function POST(request){
  try {
    //first connect to the database
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);

    //parse the request body
    const body = await request.json()
    const { name, description, price, category } = body;

    //validate the data
    if (!name || !description || !price || !category) {
      return new Response("Missing required fields", { status: 400 });
    }
    // create new product

    const newProduct = {
      name,
      description,
      price,
      category,
      createdAt: new Date(),
    };

    const result = await db.collection(process.env.PRODUCTS_COLLECTION).insertOne(newProduct);
    return Response.json(
      { message: "Product created", id: result.insertedId },
      { status: 201 }
    );
    
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}