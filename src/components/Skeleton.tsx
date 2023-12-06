import React from "react"
import { Skeleton } from "@mui/material"

export const LoadingSkeleton = () => {
  const commonSkeletonStyles = {
    sx: { borderRadius: 15 },
  }

  const renderSkeletons = (
    count: number,
    variant: "text" | "rectangular" | "rounded" | "circular" | undefined
  ) => {
    const skeletons = []
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <Skeleton
          key={i}
          width="20%"
          height={600}
          variant={variant}
          {...commonSkeletonStyles}
        />
      )
    }
    return skeletons
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      {renderSkeletons(4, "rectangular")}
    </div>
  )
}
