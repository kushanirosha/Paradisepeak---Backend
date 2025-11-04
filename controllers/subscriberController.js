import Subscriber from "../models/Subscriber.js";
import sendMail from "../middeleware/sendMail.js";

export const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Check if already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res
        .status(200)
        .json({ message: "Email already subscribed." });
    }

    // Save new subscriber
    const newSubscriber = new Subscriber({
      email,
      subscribedAt: new Date(),
    });
    await newSubscriber.save();

    // Send notification email to dashboard/admin
    const message = `
      <p>New subscriber added:</p>
      <p>Email: ${email}</p>
      <p>Subscribed At: ${newSubscriber.subscribedAt}</p>
    `;

    await sendMail(
      process.env.ADMIN_EMAIL,   // recipient
      process.env.SMTP_USER,     // must match SMTP user
      "New Subscriber Notification", 
      message
    );

    res.status(201).json({ message: "Subscription successful." });
  } catch (err) {
    console.error("Error in subscribe:", err);
    res.status(500).json({ message: "Server error." });
  }
};


// Optional: list all subscribers
export const listSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Optional: delete a subscriber
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Subscriber.findByIdAndDelete(id);
    res.json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
