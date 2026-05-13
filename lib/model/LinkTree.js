import mongoose from "mongoose";

const linksSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    title: { type: String, default: "My Links" },
    profilePicture: { type: String, default: "" },
    template: { type: String, default: "classic", enum: ["classic", "minimal", "gradient", "neon", "custom"] },
    customBg: {
        bgType: { type: String, default: "color", enum: ["color", "gradient", "image"] },
        color1: { type: String, default: "#1f232f" },
        color2: { type: String, default: "#304e21" },
        imageUrl: { type: String, default: "" },
        textColor: { type: String, default: "light", enum: ["light", "dark"] },
    },
    socialLinks: [
        {
            platform: String,
            label: String,
            url: String
        }
    ]
}, { timestamps: true })

export const LinkTree = mongoose.models.LinkTree || mongoose.model("LinkTree", linksSchema);