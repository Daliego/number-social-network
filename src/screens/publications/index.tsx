import { LogOut } from "lucide-react";
import secureLocalStorage from "react-secure-storage";
import { User } from "../../models/User";
import { useGetPublications } from "../../hooks/publications/useGetPublications";
import { RotatingLines } from "react-loader-spinner";
import { Comment } from "../../components/publications/Comments";
import { useEffect } from "react";

export function PublicationsPage() {
  const user = secureLocalStorage.getItem("user") as User | null;

  const {
    data: publications,
    isLoading: isLoadingPublications,
    isError: isErrorPublications,
  } = useGetPublications();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid black",
        }}
      >
        <div style={{ fontSize: "20px" }}>Number Social Network</div>
        {user && <LogOut />}
      </div>
      {user && (
        <h1 style={{ fontSize: "30px", padding: "20px" }}>
          Welcome Back {user.name}
        </h1>
      )}

      {isLoadingPublications && (
        <RotatingLines
          visible={true}
          width="96"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      )}

      {isErrorPublications && (
        <h1 style={{ fontSize: "30px", padding: "20px" }}>
          Error loading publications
        </h1>
      )}

      {publications && publications.length === 0 && (
        <h1 style={{ fontSize: "30px", padding: "20px" }}>
          No publications found
        </h1>
      )}

      <div
        style={{
          width: "90%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
        }}
      >
        {publications &&
          publications.length > 0 &&
          publications.map((publication) => (
            <Comment
              email={publication.user.email}
              id={publication.id}
              publicationId={publication.id}
              text={publication.text}
              type="publication"
            />
          ))}
      </div>
    </div>
  );
}
