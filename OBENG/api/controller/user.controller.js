import prisma from "../lib/prisma.js";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const saveBengkel = async (req, res) => {
  const bengkelId = req.body.bengkelId;
  const tokenUserId = req.userId;
  try {
    const savedBengkel = await prisma.savedBengkel.findUnique({
      where:{
        userId_bengkelId:{
          userId: tokenUserId,
          bengkelId,
        }
      }
    })
    if(savedBengkel){
      await prisma.savedBengkel.delete({
        where:{
          id: savedBengkel.id
        }
      })
      res.status(200).json({ message: "Workshop removed from saved list" });
    }else{
      await prisma.savedBengkel.create({
        data:{
          userId: tokenUserId,
          bengkelId
        }
      })
      res.status(200).json({ message: "Workshop saved" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

export const profileBengkel = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userBengkel = await prisma.bengkel.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedBengkel.findMany({
      where: { userId: tokenUserId },
      include: {
        bengkel: true,
      },
    });
    const savedBengkel = saved.map((item) => item.bengkel);
    res.status(200).json({ userBengkel, savedBengkel });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
