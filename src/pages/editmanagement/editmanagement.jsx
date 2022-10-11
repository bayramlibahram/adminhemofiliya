import {useEffect, useState, useCallback} from 'react';
import Axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Spinner} from "../../components";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import Swal from 'sweetalert2';
import {BACK_END} from "../../config/keys";
import 'sweetalert2/src/sweetalert2.scss';


const ManagementForm = ({managementId, management, imageUrl}) => {
    const [formManagementId] = useState(managementId);
    const [formManagement, setFormManagement] = useState(management);
    const [formManagementImgUrl, setFormManagementImgUrl] = useState(imageUrl);
    const [formManagementImg, setFormManagementImg] = useState("");
    const navigate = useNavigate();
    const reader = new FileReader();

    const inputTextHandler = event => {
        switch (event.target.name) {
            case "management_person_name_az": {
                setFormManagement({
                    ...formManagement,
                    [event.target.name]: event.target.value,
                });
                break;
            }
            case "management_person_name_en": {
                setFormManagement({
                    ...formManagement,
                    [event.target.name]: event.target.value,
                });
                break;
            }
            case "management_person_name_ru": {
                setFormManagement({
                    ...formManagement,
                    [event.target.name]: event.target.value,
                });
                break;
            }
            default: {
                setFormManagement({...formManagement, [event.target.name]: event.target.value});
                break;
            }
        }
    }
    const editorOnChange = (event, editor, editorName) => {
        try {
            const data = editor.getData();
            setFormManagement({...formManagement, [editorName]: data});
        } catch (err) {
            console.log(err);
        }
    }
    const onImageFileHandler = event => {
        setFormManagementImgUrl('')
        reader.onload = function () {
            setFormManagementImgUrl(this.result)
        };
        reader.readAsDataURL(event.target.files[0]);
        setFormManagementImg(event.target.files[0]);
    }
    const onSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("management_id", formManagementId);

        formData.append("management_image", formManagementImg);

        for (let index in Object.keys(formManagement)) {
            formData.append(Object.keys(formManagement)[index], Object.values(formManagement)[index])
        }

        Swal.fire({
            title: 'Zəhmət olmasa gözləyin!',
            html: 'Rəhbərlik haqqında məlumat bazada dəyişdirilir!',// add html attribute if you want or remove
            showConfirmButton: false,
            allowOutsideClick: false
        });

        const response = await Axios.post(`${BACK_END.HOST}/api/managements/edit`, formData);
        const data = response.data;

        if (data.status === 'SUCCESS') {
            Swal.fire('Uğurlu əməliyyat!', `${data.message}`, 'success')
                .then(() => {
                    navigate('/managements', {replace: true});
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Uğursuz əməliyyat!',
                text: `${data.message}`
            })
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }

    }

    console.log(formManagementImgUrl);

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="manage-card">
                <div className="d-flex align-items-enter justify-content-between">
                    <p className="fs-4 m-0 text-dark">Rəhbərlik</p>
                    <Link to="/managements" className="btn btn-outline-danger rounded-pill">
                        Geri
                    </Link>
                </div>
            </div>
            <div className="manage-card">
                <div className="form-group">
                    <label htmlFor="management_order_number">Sıra nömrəsi</label>
                    <input
                        type="text"
                        className="form-control"
                        id="management_order_number"
                        name="management_order_number"
                        value={formManagement.management_order_number}
                        onChange={inputTextHandler}
                    />
                </div>
            </div>
            <div className="manage-card">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            id="nav-postaz-tab"
                            data-bs-target="#nav-managementaz"
                            aria-controls="nav-managementaz"
                            aria-selected="true">
                            Az
                        </button>
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            id="nav-posten-tab"
                            data-bs-target="#nav-managementen"
                            aria-controls="nav-managementen"
                            aria-selected="false">En
                        </button>
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            id="nav-postru-tab"
                            data-bs-target="#nav-managementru"
                            aria-controls="nav-managementru"
                            aria-selected="false">Ru
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane fade show active py-3"
                        id="nav-managementaz"
                        role="tabpanel"
                        aria-labelledby="nav-managementaz-tab"
                        tabIndex="0">
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Ad - AZ</label>
                            <input
                                type="text"
                                name="management_person_name_az"
                                id="management_person_name_az"
                                className="form-control"
                                value={formManagement.management_person_name_az}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Haqqında - AZ</label>
                            <CKEditor
                                editor={Editor}
                                data={formManagement.management_person_about_az}
                                name="management_person_about_az"
                                onChange={(event, editor) => editorOnChange(event, editor, "management_person_about_az")}
                            />
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-managementen"
                        role="tabpanel"
                        aria-labelledby="nav-managementen-tab"
                        tabIndex="0">
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Ad - EN</label>
                            <input
                                type="text"
                                name="management_person_name_en"
                                id="management_person_name_en"
                                className="form-control"
                                value={formManagement.management_person_name_en}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Haqqında - EN</label>
                            <CKEditor
                                editor={Editor}
                                data={formManagement.management_person_about_en}
                                name="management_person_about_en"
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => editorOnChange(event, editor, "management_person_about_en")}
                            />
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-managementru"
                        role="tabpanel"
                        aria-labelledby="nav-managementru-tab"
                        tabIndex="0">
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Ad - RU</label>
                            <input
                                type="text"
                                name="management_person_name_ru"
                                id="management_person_name_ru"
                                className="form-control"
                                value={formManagement.management_person_name_ru}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Haqqında - RU</label>
                            <CKEditor
                                editor={Editor}
                                data={formManagement.management_person_about_ru}
                                name="management_person_about_ru"
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => editorOnChange(event, editor, "management_person_about_ru")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-4 m-0 text-primary">
                        <i className="fa-solid fa-image"></i>
                    </p>
                    <label htmlFor="managementImgfile" className="btn btn-outline-primary rounded-pill">
                        <i className="fa-solid fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="managementImgfile"
                        name="file"
                        className="d-none"
                        onChange={onImageFileHandler}
                    />
                </div>
            </div>
            <div className="manage-card">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {<img
                                src={formManagementImgUrl}
                                id="img"
                                alt=""
                                style={{width: '100%', height: "auto"}}
                            />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-card">
                <input type="submit" value="Dəyiş" className="btn btn-outline-warning"/>
            </div>
            <br/>
        </form>
    )
}

const EditManagementPage = () => {

    const managementId = useParams().id;
    const [management, setManagement] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    const fetchManagement = useCallback(async () => {
        const fetchedManagement = await Axios.get(`${BACK_END.HOST}/api/managements/management/manage/${managementId}`);
        console.log(fetchedManagement.data);
        setManagement(fetchedManagement.data);
        setImgUrl(`${BACK_END.HOST}/${fetchedManagement.data.management_image}`);

    }, [managementId]);

    useEffect(() => {
        fetchManagement()
            .then(() => {
                console.log('Management is fetched');
            })
            .catch(err => console.log(err));
    }, [fetchManagement]);

    if (!management) return <Spinner/>;
    return (
        <>
            <ManagementForm
                managementId={managementId}
                management={management}
                imageUrl={imgUrl}
            />
        </>
    );
};

export default EditManagementPage;