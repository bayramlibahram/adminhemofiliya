import {useState, useCallback, useEffect} from 'react';
import {useRequest} from "../../../hooks";
import {Spinner} from "../../../components";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const SponsorsPage = () => {
    const [sponsors, setSponsors] = useState(null);
    const {request} = useRequest();
    const fetchSponsors = useCallback(async () => {
        const sponsorsData = await request('/api/sponsors', 'GET', null);
        setSponsors(sponsorsData);
    }, [request, setSponsors]);
    const deleteSponsor = async (_id) => {
        console.log('delete sponsor is worked', _id);
        const data = await request('/api/sponsors/delete', 'POST', {
            sponsor_id: _id
        });
        if (data) {
            Swal.fire(
                'Uğurlu əməliyyat!',
                `${data.message}`,
                'success')
                .then(() => {
                    console.log('Sponsor deleted successfully!');
                    const filteredSponsor = sponsors.filter(sponsor => sponsor._id !== _id);
                    setSponsors([...filteredSponsor])
                }).catch(err => {
                console.log(err);
            });
        }
    }
    useEffect(() => {
        fetchSponsors().then(() => {
            console.log('Sponsors fetched successfully!');
        }).catch(err => {
            console.log(err);
        });
    }, [fetchSponsors]);
    if (!sponsors) return <Spinner/>;
    return <SponsorsList sponsors={sponsors} deleteSponsor={deleteSponsor}/>;
};

const SponsorsList = ({sponsors, deleteSponsor}) => {
    return <>
        <div className="manage-card">
            <div className="d-flex align-items-center justify-content-between">
                <p className="m-0 fs-4 font-500">Sponsorlar</p>
                <Link rel="stylesheet" to="/sponsor" className="btn btn-primary rounded-pill">
                    Yeni sponsor
                </Link>
            </div>
        </div>
        <div className="manage-card">
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Sponsor</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {sponsors.map((sponsor, index) => {
                    return (
                        <tr key={sponsor._id}>
                            <td>{index + 1}</td>
                            <td>
                                <a href={sponsor.sponsor_url} target="_blank">
                                    {sponsor.sponsor_name}
                                </a>
                            </td>
                            <td>
                                <Link
                                    className="btn btn-outline-primary btn-sm"
                                    to={`/sponsor/${sponsor._id}`}
                                >
                                    <i className="fa-solid fa-pencil"></i>
                                </Link>
                                <button
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={async () => {
                                        await deleteSponsor(sponsor._id)
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
};

export default SponsorsPage;