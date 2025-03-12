import { useState, useEffect } from "react";
import { PostFrom, Container } from "../components";
import appwriteService from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostFrom post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
