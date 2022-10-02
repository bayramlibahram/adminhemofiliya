import {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useRequest} from "../../hooks";
import {Spinner} from "../../components";
import Swal from "sweetalert2";
import {BACK_END} from "../../config/keys";

const NavigationsPage = () => {

    const [navigations, setNavigations] = useState(null);
    const {request} = useRequest();

    const fetchNavigations = useCallback(async () => {
        const fetchedNavigations = await request('/api/navigations', 'GET', null);
        setNavigations(fetchedNavigations);
    }, [request]);

    const deleteNavigation = async _id => {
        console.log(_id);
        Swal.fire({
            title: 'Bölməni silməyə əminsinizmi ?',
            text: "Diqqət bölmə silinəcək!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Bəli',
            cancelButtonText:'Xeyr'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deletedPost = await request(`${BACK_END.HOST}/api/navigations/delete`, 'POST', {
                    nav_id: _id
                });

                if (deletedPost.status === 'SUCCESS') {
                    Swal.fire('Uğurlu əməliyyat!', `${deletedPost.message}`, 'success')
                        .then(() => {
                            const newNavs = navigations.filter(nav => nav._id !== _id);
                            setNavigations([...newNavs]);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }


            }
        })
    }

    useEffect(() => {
        fetchNavigations();
    }, [fetchNavigations])


    if (!navigations) return <Spinner/>;

    return (
        <>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-4 font-500 m-0">Bölmələr</p>
                    <Link to="/navigation" className="btn btn-primary rounded-pill">
                        Yeni bölmə
                    </Link>
                </div>
            </div>
            <div className="manage-card">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Başlıq</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {navigations.map((navigation, index) => {
                        return (
                            <tr key={navigation._id}>
                                <td>{index + 1}</td>
                                <td>{navigation.navigation_name_az}</td>
                                <td>
                                    <Link
                                        className="btn btn-outline-primary btn-sm"
                                        to={`/navigation/${navigation._id}`}
                                    >
                                        <i className="fa-solid fa-pencil"></i>
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        onClick={async () => {
                                            await deleteNavigation(navigation._id)
                                        }}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default NavigationsPage;