"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * Shared avatar component using Next.js Image for optimized loading.
 * Falls back to the first letter of the username if no image is provided or if it fails to load.
 */
export default function ProfileAvatar({
  src,
  fallbackLetter = "?",
  size = 112,
  className = "",
}) {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className={className}>
        {fallbackLetter}
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={src}
        alt="Profile"
        width={size}
        height={size}
        className="w-full h-full object-cover"
        quality={90}
        priority
        onError={() => setImgError(true)}
        unoptimized={src.startsWith("data:")}
      />
    </div>
  );
}
