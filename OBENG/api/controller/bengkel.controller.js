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

        res.status(200).json(bengkelsearch)
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
            
        res.status(200).json(bengkel)
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

export const updateBengkel = async (req, res) => {
    
    try{
        
        res.status(200).json()
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to update workshop"})
    }
}

export const deleteBengkel = async (req, res) => {
    const id = req.params.id
    const tokenUserId = req.userId
    try{
        const bengkel = await prisma.bengkel.findUnique({
            where:{id}
        })
        if(bengkel.userId!==tokenUserId){
            return req.status(403).json({message:"Not authorized"})
        }
        await prisma.bengkel.delete({
            where:{id}
        })
        res.status(200).json({message:"bengkel deleted"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to delete workshop"})
    }
}

export const reviewBengkel = async (req, res) => {
    const body = req.body
    const tokenUserId = req.userId;
    const urlbengkelId = req.url.split("/")[1]
    try{
        const newReview = await prisma.review.create({
            data:{
                ...body.postData, 
                userId: tokenUserId,
                bengkelId : urlbengkelId
            }
        })
        res.status(200).json(newReview)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to leave a review"})
    }
}