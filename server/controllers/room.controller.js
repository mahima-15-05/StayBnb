const Room = require('../models/room.model.js');

const createRoom = async(req,res)=>{

    const {title, description, price, location, images, amenities} = req.body;

    if(!title?.trim() || price ==  null || typeof price !== "number" || price <=0 || !location?.trim())
        return res.status(400).json({message:"Fill the required fields"});

    try {
        const room = await Room.create({title,description, price, location, images : images || [], amenities : amenities || []});

        res.status(201).json({message:"Room added !", room});

    } catch (error) {
        console.error("Create room error ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}


const getRooms = async(req,res)=>{
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit)  || 10) );
    const skip = (page-1) * limit;

    const filter = {};

    if(req.query.location){
        filter.location = req.query.location
    }

    const [rooms, roomsCount] = await Promise.all(
       [
          Room.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
        Room.countDocuments(filter)
       ]
    );


    
    res.status(200).json({message:"Rooms fetched successfully", page, totalPages: Math.ceil(roomsCount/limit), totalRooms: roomsCount , rooms});


  } catch (error) {
    console.error("Error in fetching rooms ", error.message);

    res.status(500).json({message:"Internal server error"})
  }
}


const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ 1. Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid room ID" });
    }

    // ✅ 2. Allow only specific fields (security)
    const allowedUpdates = ["title", "description", "price", "location", "images", "amenities"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // ✅ 3. Update with validation
    const room = await Room.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    // ✅ 4. Check if room exists
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({
      message: "Room updated successfully",
      room,
    });

  } catch (error) {
    console.error("Error in updating room:", error.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {createRoom, getRooms, updateRoom};