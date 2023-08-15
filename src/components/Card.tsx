import React from "react"

interface Props {
  query: Record<string, any>
}

export const Card = (props: Props) => {
  return (
    <div>
      <div>
        {props.query.map((query: Record<string, any>) => (
          <div>
            <div>{query.name}</div>
            <div>{query.type}</div>
            <div>{query.set}</div>
            <div>{query.year}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
