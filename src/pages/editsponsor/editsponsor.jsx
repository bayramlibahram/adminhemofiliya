import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import {Spinner} from "../../../components";

const EditSponsorPage = () => {

    const sponsorId = useParams().id;
    const [sponsor, setSponsor] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    const fetchSponsor = useCallback(async () => {
        const fetchedSponsor = await Axios.get(`/api/sponsors/${sponsorId}`);
        setSponsor(fetchedSponsor.data);
        console.log(fetchedSponsor.data)
        setImgUrl(`${process.env.PUBLIC_URL}/content/images/${sponsor.sponsor_image_name}`);
    }, [sponsorId]);

    useEffect(() => {
        fetchSponsor()
            .then(() => console.log('Sponsor fetched successfully'))
            .catch(err => console.log(err));
    }, [fetchSponsor])

    console.log(sponsorId);

    if (!sponsor) return <Spinner/>;

    return <SponsorForm
        sponsor={sponsor}
        imageUrl={imgUrl}
        sponsorId={sponsorId}
    />
};

const SponsorForm = ({sponsor, imageUrl, sponsorId}) => {
    const reader = new FileReader();
    const navigate = useNavigate();
    const [formSponsorId] = useState(sponsorId);
    const [sponsorForm, setSponsorForm] = useState(sponsor);
    const [sponsorImageUrl, setSponsorImageUrl] = useState(imageUrl);
    const [sponsorImage, setSponsorImage] = useState("");

    const inputValueChangeHandler = event => {
        setSponsorForm({
            ...sponsorForm,
            [event.target.name]: event.target.value
        });
    };
    const sponsorImageFileChange = event => {
        setSponsorImageUrl('')
        reader.onload = function () {
            setSponsorImageUrl(this.result)
        };
        reader.readAsDataURL(event.target.files[0]);
        setSponsorImage(event.target.files[0]);
    }
    const onSubmit = async event => {
        event.preventDefault();

        console.log('on submit is worked!');

        const formData = new FormData();
        formData.append('sponsor_id', formSponsorId);
        formData.append('sponsor_name', sponsorForm.sponsor_name);
        formData.append('sponsor_url', sponsorForm.sponsor_url);
        formData.append('sponsor_image_file', sponsorImage);

        const response = await Axios.post('/api/sponsors/edit', formData);
        const data = response.data;

        if (data.status === 'SUCCESS') {

            Swal.fire(
                'Uğurlu əməliyyat!',
                `${data.message}`,
                'success')
                .then(() => {
                    navigate('/sponsors', {replace: true});
                }).catch(err => {
                console.log(err);
            });
        }
        if (data.status === 'FAIL') {
            Swal.fire({
                icon: 'error',
                title: 'Uğursuz əməliyyat!',
                text: `${data.message}`
            })
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }

    };
    return <form onSubmit={onSubmit} encType="multipart/form-data">
        {/*Sponsor title card*/}
        <div className="manage-card">
            <div className="d-flex align-items-enter justify-content-between">
                <p className="fs-4 m-0 text-dark">Sponsor</p>
                <Link to="/sponsors" className="btn btn-outline-danger rounded-pill">
                    Geri
                </Link>
            </div>
        </div>
        {/*Sponsor form inputs*/}
        <div className="manage-card">
            <div className="form-group mb-2">
                <label htmlFor="sponsor_name">Sponsor - ad</label>
                <input
                    type="text"
                    id="sponsor_name"
                    name="sponsor_name"
                    className="form-control"
                    value={sponsorForm.sponsor_name}
                    onChange={inputValueChangeHandler}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="sponsor_name">Sponsor - link</label>
                <input
                    type="text"
                    id="sponsor_url"
                    name="sponsor_url"
                    className="form-control"
                    value={sponsorForm.sponsor_url}
                    onChange={inputValueChangeHandler}
                />
            </div>
        </div>
        {/* Sponsor image*/}
        <div className="manage-card">
            <div className="d-flex align-items-center justify-content-between">
                <p className="fs-4 m-0 text-primary">
                    <i className="fa-solid fa-image"></i>
                </p>
                <label htmlFor="sponsorImageFile" className="btn btn-outline-primary rounded-pill">
                    <i className="fa-solid fa-plus"></i>
                </label>
                <input
                    type="file"
                    id="sponsorImageFile"
                    name="sponsorImageFile"
                    className="d-none"
                    onChange={sponsorImageFileChange}
                />
            </div>
        </div>
        <div className="manage-card">
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {<img src={sponsorImageUrl} id="img" alt="" style={{width: '100%', height: "auto"}}/>}
                    </div>
                </div>
            </div>
        </div>
        <div className="manage-card">
            <button
                className="btn btn-outline-primary"
            >
                Əlavə et
            </button>
        </div>
    </form>;
}

export default EditSponsorPage;