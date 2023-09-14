import React from "react"
import { Skeleton } from "@mui/material"

interface Props {
  view: boolean
}

export const Loading = ({ view }: Props) => {
  return view ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 20px",
      }}
    >
      <Skeleton
        variant="rounded"
        width="22%"
        height={600}
        sx={{ borderRadius: 15 }}
      />
      <Skeleton
        variant="rounded"
        width="22%"
        height={600}
        sx={{ borderRadius: 15 }}
      />
      <Skeleton
        variant="rounded"
        width="22%"
        height={600}
        sx={{ borderRadius: 15 }}
      />
      <Skeleton
        variant="rounded"
        width="22%"
        height={600}
        sx={{ borderRadius: 15 }}
      />
    </div>
  ) : (
    <div
      style={{
        display: "block",
        justifyContent: "center",
      }}
    >
      <Skeleton
        variant="rounded"
        width="100%"
        height={150}
        sx={{ borderRadius: 15, marginBottom: 5, marginTop: 5 }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height={150}
        sx={{ borderRadius: 15, marginBottom: 5 }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height={150}
        sx={{ borderRadius: 15, marginBottom: 5 }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height={150}
        sx={{ borderRadius: 15, marginBottom: 5 }}
      />
    </div>
  )
}
