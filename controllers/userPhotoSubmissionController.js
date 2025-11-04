import UserSharePhoto from "../models/UserSharePhoto.js";
import Package from "../models/Package.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createPhotoSubmission = async (req, res) => {
    try{
        
            const{user, packageId ,description,drivelink} = req.body;

            if(!user || ! packageId || !drivelink ){
                return res.status(400).json({message:"Missing required fileds "});
            }

            const PhotoSubmission = new UserSharePhoto({
            user, packageId ,description,drivelink
            });

       await PhotoSubmission.save();

            return res.status(201).json({
            success: true,
            message: "Photo submission created successfully",
            data: PhotoSubmission,
          });
  } catch (error) {
    console.error("Error creating photo submission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// specific user
export const getPhotoSubmission = async (req, res) => {
   try {
    // console.log("hello")
   
    const submissions = await UserSharePhoto.find({ user: req.params.userId })
      .populate("packageId", "title");

      const data = submissions.map((sub) => ({
        package: sub.packageId?.title,
        drivelink: sub.drivelink,
        description: sub.description,
      }));
       if (!submissions || submissions.length === 0) {
      return res.status(404).json({ 
        success: false, message: "No submissions found for this user." });
    }
    res.status(200).json({ 
      success: true,
      data: data, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// all user
export const getAllPhotoSubmission = async (req, res) => {
   try {
    // console.log(req.query)
    const apiFeatures = new APIFeatures(UserSharePhoto.find().populate("packageId", "title").populate("user", "name"),req.query).search()
    // console.log(apiFeatures)
        const sharePhoto = await apiFeatures.query;
        return res.status(200).json({
            success:true,
            count:sharePhoto.length,
            data: sharePhoto,
          });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

