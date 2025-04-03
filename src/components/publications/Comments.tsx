import { useState } from "react";
import { useGetComments } from "../../hooks/comments/useGetComments";
import { Operands } from "./Operands";

interface CommentProps {
  id: string;
  email: string;
  operation?: string;
  createdAt?: string;
  publicationId: string;
  userId?: string;
  text: string;
  type: "publication" | "reply";
}

export function Comment({
  id,
  email,
  operation,
  createdAt = new Date().toString(),
  text,
  userId,
  type,
  publicationId,
}: CommentProps) {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  console.log("comment id", id);
  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useGetComments({
    id: seeMore ? id : "",
    typeId: type,
  });

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
          gap: "10px",
          display: "flex",
        }}
      >
        <div>
          <img
            src="/ellty-logo-black.svg"
            alt="Logo"
            height={100}
            width={100}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <div>
            <h3>{email}</h3>
            <div
              style={{
                fontSize: "11px",
              }}
            >
              {createdAt}
            </div>
          </div>
          <div>
            {operation && (
              <div>
                Operation: {operation} <br />
              </div>
            )}
            <div style={{ fontWeight: "500" }}>{text}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Operands
              publicationId={publicationId}
              predecessorId={type === "publication" ? undefined : id}
              replyType={type}
              userId={userId}
            />
            <div
              onClick={() => setSeeMore((old) => !old)}
              style={{ color: "blue" }}
            >
              See more
            </div>
          </div>
        </div>
      </div>
      {seeMore &&
        !isLoadingComments &&
        !isErrorComments &&
        comments?.length === 0 &&
        comments?.map((comment) => (
          <Comment
            email={comment.user.email}
            id={comment.id}
            publicationId={comment.publicationId}
            text={comment.text}
            type="reply"
          />
        ))}
    </div>
  );
}
