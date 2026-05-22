import { ImageResponse } from "next/og";
import { connectDB } from "@/lib/db";
import { LinkTree } from "@/lib/model/LinkTree";
import { User } from "@/lib/model/User";

// Run on standard serverless Node.js runtime so Mongoose/MongoDB connections work flawlessly
export const alt = "Linkify Profile Card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { username } = await params;
  let userDetails = {
    username: username,
    bio: "Claim your free bio link page on Linkify.",
    themeColor: "#d6e752",
  };

  try {
    await connectDB();
    const user = await User.findOne({ username: username.toLowerCase() }).lean();
    if (user) {
      const tree = await LinkTree.findOne({ user: user._id }).lean();
      userDetails = {
        username: user.username,
        bio: tree?.bio || "Connect with me on social platforms!",
        themeColor: "#d6e752",
      };
    }
  } catch (error) {
    console.error("OG Image generation DB error:", error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1f232f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "50px",
          border: "20px solid #d6e752",
          boxSizing: "border-box",
        }}
      >
        {/* Glowing border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 90% 10%, rgba(214, 231, 82, 0.08), transparent 50%)",
          }}
        />

        {/* Profile Card Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Avatar Icon */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#d6e752",
              color: "#1f232f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "64px",
              fontWeight: "900",
              marginBottom: "30px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            {userDetails.username.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <div
            style={{
              fontSize: "60px",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "15px",
              letterSpacing: "-1px",
            }}
          >
            @{userDetails.username}
          </div>

          {/* User Bio */}
          <div
            style={{
              fontSize: "26px",
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
              maxWidth: "850px",
              lineHeight: "1.5",
              marginBottom: "40px",
            }}
          >
            {userDetails.bio}
          </div>

          {/* Branding Subtext */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 24px",
              borderRadius: "50px",
              background: "rgba(214, 231, 82, 0.1)",
              border: "1px solid rgba(214, 231, 82, 0.2)",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#d6e752",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              linkify-ak.vercel.app/{userDetails.username}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
