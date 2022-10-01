import Axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {Spinner} from "../../../components";
import {Link} from "react-router-dom";
import {convertedDate} from "../../../utils/dateconvert";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ManagementList = ({managements, deleteManagment}) => {
    return (
        <>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="m-0 fs-4 font-500">Rəhbərlik</p>
                    <Link rel="stylesheet" to="/management" className="btn btn-primary rounded-pill">
                        Yeni rəhbərlik
                    </Link>
                </div>
            </div>
            <div className="manage-card">
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sıra №</th>
                        <th scope="col">Rəhbərlik</th>
                        <th scope="col">Tarix</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {managements.map((management, index) => {
                        return (
                            <tr key={management._id}>
                                <td>{index + 1}</td>
                                <td><span className="badge text-bg-dark">{management.management_order_number}</span></td>
                                <td style={{width: '600px'}}>{management.management_person_name_az}</td>
                                <td>{convertedDate(management.created_at)}</td>
                                <td>
                                    <Link
                                        className="btn btn-outline-primary btn-sm"
                                        to={`/management/${management._id}`}
                                    >
                                        <i className="fa-solid fa-pencil"></i>
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        onClick={ async () => {
                                            await deleteManagment(management._id)
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
}

const ManagementsPage = () => {

    const [managements, setManagements] = useState(null);

    const fetchManagements = useCallback(async () => {
        const fetchedManagements = await Axios.get('/api/managements');
        setManagements(fetchedManagements.data);
    }, []);

    const deleteManagment = async _id => {
        Swal.fire({
            title: 'Rəhbəri silməyə əminsinizmi ?',
            text: "Diqqət Rəhbər silinəcək!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Bəli',
            cancelButtonText: 'Xeyr'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteManagement = await Axios.post('/api/managements/delete', {
                    management_id: _id
                });

                if (deleteManagement.data.status === 'SUCCESS') {
                    Swal.fire('Uğurlu əməliyyat!', `${deleteManagement.data.message}`, 'success')
                        .then(() => {
                            const newManagements = managements.filter(management => management._id !== _id);
                            setManagements([...newManagements]);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        });
    }

    useEffect(() => {
        fetchManagements()
            .then(() => console.log('Managements fetched'))
            .catch(err => console.log(err));
    }, [fetchManagements]);

    if (!managements) return <Spinner/>;

    return <ManagementList managements={managements} deleteManagment={deleteManagment}/>
};

export default ManagementsPage;