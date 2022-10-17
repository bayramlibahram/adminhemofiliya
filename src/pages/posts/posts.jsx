import {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import {Spinner} from "../../components";
import {Link} from "react-router-dom";
import {convertedDate} from "../../utils/dateconvert";
import {BACK_END} from "../../config/keys";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const postCase = post_case => {
    if (post_case === "banner") {
        return (
            <span className="badge text-bg-primary">Manşet</span>
        )
    } else {
        return (
            <span className="badge text-bg-dark">Sadə</span>
        )
    }
}

const PostsPage = () => {
    const [posts, setPosts] = useState(null);
    const fetchPosts = useCallback(async () => {
        const response = await Axios.get(`${BACK_END.HOST}/api/posts`);
        setPosts(response.data);
    }, []);
    const deletePost = async _id => {
        Swal.fire({
            title: 'Məqaləni silməyə əminsinizmi ?',
            text: "Diqqət məqalə silinəcək!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Bəli',
            cancelButtonText: 'Xeyr'
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const response = await Axios.post(`${BACK_END.HOST}/api/posts/delete/post`, {
                        post_id: _id
                    });
                    if (response.data.status === 'SUCCESS') {
                        Swal.fire('Uğurlu əməliyyat!', `${response.data.message}`, 'success')
                            .then(() => {
                                setPosts([...posts.filter(post => post._id !== _id)]);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
            });
    }
    useEffect(() => {
        fetchPosts()
            .then(() => console.log('Posts fetched successfully'))
            .catch(err => console.log(err));
    }, [fetchPosts]);

    return <PostList posts={posts} deletePost={deletePost}/>;
};

const PostList = ({posts, deletePost}) => {
    return (
        <>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="m-0 fs-4 font-500">Məqalələr</p>
                    <Link rel="stylesheet" to="/post" className="btn btn-primary rounded-pill">
                        Yeni məqalə
                    </Link>
                </div>
            </div>
            {posts ? <div className="manage-card">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Başlıq</th>
                            <th scope="col">Bölmə</th>
                            <th scope="col">Baxış sayı</th>
                            <th scope="col">Tarix</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post, index) => {
                            return (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td style={{width: '500px'}}>{post.post_title_az}</td>
                                    <td>{postCase(post.post_case)}</td>
                                    <td><span className="badge text-bg-success">{post.post_view_count}</span></td>
                                    <td>{convertedDate(post.post_date)}</td>
                                    <td>
                                        <div className="d-flex">
                                            <Link className="btn btn-outline-primary btn-sm" to={`/post/${post._id}`}>
                                                <i className="fa-solid fa-pencil"></i>
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={async () => {
                                                    await deletePost(post._id)
                                                }}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div> : <Spinner/>}
        </>
    );
}

export default PostsPage;