import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
export const bookRouters = express.Router();

bookRouters.post("/books", async (req: Request, res: Response) => {
   try {
      const bookBody = req.body;
      const book = await Book.create(bookBody);
      res.status(201).send({
         success: true,
         message: "Book Create successful",
         book
      })
   } catch (error: any) {
      res.status(500).json({
         message: "Validation failed",
         success: false,
         error: error.message || "Someting went wrong",
      });
   }

});
bookRouters.get("/books", async (req: Request, res: Response) => {
   try {
      let data;
      const filter = req.query.filter as string || "";
      const sortBy = req.query.sortBy as string || "createdAt";
      const sortParams = req.query.sort?.toString().toLowerCase();
      const sort = sortParams === "desc" ? -1 : sortParams === "asc" ? 1 : "desc";
      const limit = parseInt(req.query.limit as string) || 10;
      const query = filter ? { genre: filter } : {};


      data = await Book.find(query).sort({ [sortBy]: sort }).limit(limit);

      res.send({
         success: true,
         message: "Books retrieved successfully",
         data
      })
   } catch (error: any) {
      res.status(500).send({
         message: "Data Get Failed",
         success: false,
         error: error.message || "Someting went wrong",
      })
   }
});
bookRouters.get("/books/:bookId", async (req: Request, res: Response) => {
   try {
      const id = req.params.bookId;
      const book = await Book.findById(id);

      if (!book) {
         return res.status(404).json({
            success: false,
            message: "Book not found",
            error: `No book found with id: ${id}`,
         });
      }

      res.status(200).json({
         success: true,
         message: "Book retrieved successfully",
         data: book,
      });

   } catch (error: any) {
      // Check for invalid MongoDB ObjectId error
      if (error.name === "CastError") {
         return res.status(400).json({
            success: false,
            message: "Invalid book ID",
            error: `Provided book ID is not a valid MongoDB ObjectId`,
         });
      }

      // Fallback for other unknown errors
      res.status(500).json({
         success: false,
         message: "Failed to retrieve book",
         error: error.message || "Something went wrong",
      });
   }
});
bookRouters.patch("/books/:bookId", async (req: Request, res: Response) => {
   try {
      const body = req.body;
      const id = req.params.bookId;
      const data = await Book.findByIdAndUpdate(id, body, { new: true });


      res.send({
         success: true,
         message: "Book updated successfully",
         data
      })
   } catch (error: any) {

      // Check for invalid MongoDB ObjectId error
      if (error.name === "CastError") {
         return res.status(400).json({
            success: false,
            message: "Invalid book ID",
            error: `Provided book ID is not a valid MongoDB ObjectId`,
         });
      };

      res.send({
         "message": "Book updated Validation failed",
         "success": false,
         "error": error.message || "Someting Update Problem",
      })
   }
})
bookRouters.delete("/books/:bookId", async (req: Request, res: Response) => {
   try {
      const id = req.params.bookId;
      await Book.findByIdAndDelete(id);
      res.send({
         success: true,
         message: "Book deleted successfully",
         data: null
      });
   } catch (error : any) {
      // Check for invalid MongoDB ObjectId error
      if (error.name === "CastError") {
         return res.status(400).json({
            success: false,
            message: "Invalid book ID",
            error: `Provided book ID is not a valid MongoDB ObjectId`,
         });
      };
      res.send({
         "message": "Book updated Validation failed",
         "success": false,
         "error": error
      })
   }
})