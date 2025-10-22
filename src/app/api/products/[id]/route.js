import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

//get single product by id
export async function GET(request, context) {
  try {
    const { id } = await context.params;
    let client = await clientPromise;
    let db = client.db(process.env.DATABASE);

    const product = await db
      .collection(process.env.PRODUCTS_COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response("Product Not Found", { status: 404 });
    }
    return Response.json(product);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    let client = await clientPromise;
    let db = client.db(process.env.DATABASE);

    const updates = await request.json();
    const result = await db
      .collection(process.env.PRODUCTS_COLLECTION || "products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(
      { message: "product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    let client = await clientPromise;
    let db = client.db(process.env.DATABASE);
    const result = await db
      .collection(process.env.PRODUCTS_COLLECTION || "products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
}
