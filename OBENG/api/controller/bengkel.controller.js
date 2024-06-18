import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken";

export const getAllBengkel = async (req, res) => {
    const query = req.query
    try{
        let bengkelsearch
        if(!query.search && !query.specialization){
            bengkelsearch = await prisma.bengkel.findMany()
        }else{
            bengkelsearch = await prisma.bengkel.findMany({
                where:{
                    OR : [
                        {name: {contains: query.search, mode: 'insensitive'} || undefined},
                        {address: {contains: query.search, mode: 'insensitive'} || undefined},
                        {description: {contains: query.search, mode: 'insensitive'} || undefined}
                    ],
                    specialization: query.specialization || undefined
                }
            })
        }
        // setTimeout(() => {
        res.status(200).json(bengkelsearch)
        // }, 300);
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get workshop"})
    }
}

export const getBengkel = async (req, res) => {
    const id = req.params.id
    try{
        const bengkel= await prisma.bengkel.findUnique({
            where:{id},
            include:{
                review:true
            }
        })

        const token = req.cookies?.token;

        if (token) {
          jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if (!err) {
              const saved = await prisma.savedBengkel.findUnique({
                where: {
                    userId_bengkelId: {
                    bengkelId: id,
                    userId: payload.id,
                  },
                },
              });
              res.status(200).json({ ...bengkel, isSaved: saved ? true : false });
            }
          });
        }else{
            res.status(200).json({ ...bengkel, isSaved: false });

        }
        
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to get workshop"})
    }
}

export const addBengkel = async (req, res) => {
    const body = req.body
    const tokenUserId = req.userId;
    try{
        const newBengkel = await prisma.bengkel.create({
            data:{
                ...body.postData, 
                userId: tokenUserId
            }
         })
         
        res.status(200).json(newBengkel)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to add workshop"})
    }
}

export const reviewBengkel = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;
    const urlbengkelId = req.url.split("/")[1];

    try {
        const newReview = await prisma.review.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                bengkelId: urlbengkelId
            }
        });

        const reviews = await prisma.review.findMany({
            where: { bengkelId: urlbengkelId }
        });

        const totalReviews = reviews.length;
        const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = sumRatings / totalReviews;

        const updatedBengkel = await prisma.bengkel.update({
            where: { id: urlbengkelId },
            data: { rating: averageRating }
        });

        res.status(200).json({ newReview, updatedBengkel });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to leave a review" });
    }
};