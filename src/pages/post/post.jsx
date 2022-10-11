import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Spinner} from "../../components";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import DatePicker from "react-datepicker";
import {useRequest} from "../../hooks";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import "react-datepicker/dist/react-datepicker.css";
import "./post.css";
import {BACK_END} from "../../config/keys";

const postViewRender = (value) => {
    switch (value) {
        case true: {
            return (<>
                <option selected value="true">Bəli</option>
                <option value="false">Xeyr</option>
            </>)
        }
        case false: {
            return (<>
                <option value="true">Bəli</option>
                <option selected value="false">Xeyr</option>
            </>)
        }
        default: {
            return (<>
                <option value="true">Bəli</option>
                <option value="false">Xeyr</option>
            </>)
        }
    }
}

const titleIdCreator = title => {
    return title
        .replaceAll('“', "")
        .replaceAll("”", "")
        .replaceAll("\"", "")
        .replaceAll(" ", "-")
        .replaceAll(",", "-")
        .replaceAll('Ə', "E")
        .replaceAll("ə", "e")
        .replaceAll("Ö", "o")
        .replaceAll("ö", "o")
        .replaceAll("Ü", "u")
        .replaceAll("ü", "u")
        .replaceAll("İ", "I")
        .replaceAll("i", "i")
        .replaceAll("Ğ", "G")
        .replaceAll("ğ", "g")
        .replaceAll("Ş", "S")
        .replaceAll("ş", "s")
        .replaceAll("Ç", "c")
        .replaceAll("ç", "c")
        .replaceAll("&", "-")
        .replaceAll("!", "-")
        .replaceAll("-", "-")
        .replaceAll("(", "-")
        .replaceAll(")", "-")
        .replaceAll("--", "-")
        .replaceAll("!!", "-")
        .toLowerCase() + "-" + Date.now().toString();
}

const PostPage = () => {

    const {request, loading} = useRequest();
    const navigate = useNavigate();
    const [navigations, setNavigations] = useState([]);
    const [form, setForm] = useState({
        post_title_id_az: "",
        post_title_az: "",
        post_seo_az: "",
        post_description_az: "",
        post_content_az: "",
        post_view_az: true,
        post_title_id_en: "",
        post_title_en: "",
        post_seo_en: "",
        post_description_en: "",
        post_content_en: "",
        post_view_en: false,
        post_title_id_ru: "",
        post_title_ru: "",
        post_seo_ru: "",
        post_description_ru: "",
        post_content_ru: "",
        post_view_ru: false,
        post_case: "banner",
        post_category: "home",
        post_sub_category: "empty",
        post_img: "",
        post_date: new Date()
    });

    const [subNavigations, setSubNavigations] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [postImg, setPostImg] = useState("");
    const [formSubImages, setFormSubImages] = useState([]);
    const [formFiles, setFormFiles] = useState([]);

    const reader = new FileReader();

    const onFileInputChange = event => {
        setImgUrl('')
        reader.onload = function () {
            setImgUrl(this.result)
        };
        reader.readAsDataURL(event.target.files[0]);
        setPostImg(event.target.files[0]);
    }

    const addFormSubImage = event => {
        for (let file of event.target.files) {
            const reader = new FileReader();
            reader.onload = function () {
                const sub_mage = {
                    _id: uuidv4(),
                    sub_img_filename: file.name,
                    sub_img_url: this.result,
                    sub_img_file: file
                };
                setFormSubImages((formSubImages) => [...formSubImages, sub_mage]);
            };
            reader.readAsDataURL(file);
        }
    }

    const deleteFormSubImage = (id) => {

        const newFormSubImages = formSubImages.filter(sub_img => sub_img._id !== id);

        setFormSubImages([...newFormSubImages]);

    }

    const editorOnChange = (event, editor, editorName) => {
        try {
            const data = editor.getData();
            setForm({...form, [editorName]: data});
        } catch (err) {
            console.log(err);
        }
    }

    const inputTextHandler = event => {
        switch (event.target.name) {
            case "post_title_az": {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value,
                    post_title_id_az: titleIdCreator(event.target.value)
                });
                break;
            }
            case "post_title_en": {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value,
                    post_title_id_en: titleIdCreator(event.target.value)
                });
                break;
            }
            case "post_title_ru": {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value,
                    post_title_id_ru: titleIdCreator(event.target.value)
                });
                break;
            }
            default: {
                setForm({...form, [event.target.name]: event.target.value})
            }
        }
    }

    const postViewHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const postCaseHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const postCaseRender = postCase => {
        switch (postCase) {
            case "banner": {
                return (<>
                    <option selected value="banner">Manşet</option>
                    <option value="simple">Sadə</option>
                </>)
            }
            case "simple": {
                return (<>
                    <option value="banner">Manşet</option>
                    <option selected value="simple">Sadə</option>
                </>);
            }
            default: {
                setForm({...form, post_case: 'banner'});
                return (<>
                    <option selected value="banner">Manşet</option>
                    <option value="simple">Sadə</option>
                </>);
            }
        }
    }

    const addFileHandler = async event => {
        setFormFiles([...formFiles, {
            id: uuidv4(),
            file_original_name: event.target.files[0].name,
            file_input: event.target.files[0]
        }]);
    }

    const deleteFormFilesHandler = (id) => {
        const filterFormFiles = formFiles.filter(formFile => formFile.id !== id);
        setFormFiles([...filterFormFiles]);
    }

    const postCategoryHandler = event => {

        const sub_navigations = navigations.filter(nav => nav.navigation_value === event.target.value);
        setSubNavigations([...sub_navigations[0].sub_navigations]);

        if (!sub_navigations[0].sub_navigations || sub_navigations[0].sub_navigations.length === 0) {
            setForm({
                ...form, post_category: event.target.value, post_sub_category: "empty"
            });
        } else {
            console.log(sub_navigations[0].sub_navigations)
            setForm({
                ...form,
                post_category: event.target.value,
                post_sub_category: sub_navigations[0].sub_navigations[0].subnav_value
            });
        }


    }

    const postSubCategoryHandler = event => {
        setForm({
            ...form,
            post_sub_category: event.target.value
        });
    }

    const onSubmit = async event => {

        event.preventDefault();

        const formData = new FormData();

        formData.append("post_img", postImg);

        for (let sub of formSubImages) {
            formData.append("post_sub_images", sub.sub_img_file);
        }

        for (let index in Object.keys(form)) {
            formData.append(Object.keys(form)[index], Object.values(form)[index])
        }


        for (let f of formFiles) {
            formData.append("post_files", f.file_input);
            formData.append("post_files_names", f.file_original_name);
        }

        Swal.fire({
            title: 'Zəhmət olmasa gözləyin!',
            html: 'Məqalə bazaya yüklənir!',// add html attribute if you want or remove
            showConfirmButton: false,
            allowOutsideClick: false
        });


        const response = await axios.post(`${BACK_END.HOST}/api/posts/add`, formData);
        const data = response.data;

        if (data.status === 'SUCCESS') {
            Swal.fire('Uğurlu əməliyyat!', `${data.message.az}`, 'success').then(() => {
                navigate('/posts', {replace: true});
            }).catch(err => {
                console.log(err);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Uğursuz əməliyyat!',
                text: `${data.message}`
            }).then(data => console.log(data)).catch(err => console.log(err));
        }

    }

    const fetchNavigations = useCallback(async () => {
        const fetchedNavigations = await request(`${BACK_END.HOST}/api/navigations`, 'GET', null);

        setNavigations([...fetchedNavigations]);
        setSubNavigations([...navigations[0].sub_navigations]);

    }, [request]);

    useEffect(() => {
        fetchNavigations().then(() => {
            console.log('Navigations fetched');
        });

    }, [fetchNavigations]);

    if (loading) return <Spinner/>;

    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="manage-card">
                <div className="d-flex align-items-enter justify-content-between">
                    <p className="fs-4 m-0 text-dark">Məqalə</p>
                    <Link to="/posts" className="btn btn-outline-danger rounded-pill">
                        Geri
                    </Link>
                </div>
            </div>
            <div className="manage-card">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="post_category">Kategoriya</label>
                            <select
                                name="post_category"
                                id="post_category"
                                className="form-control"
                                onChange={postCategoryHandler}
                            >
                                {navigations.map(navigation => {
                                    return (
                                        <option key={navigation._id} value={navigation.navigation_value}>
                                            {navigation.navigation_name_az}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="post_subcategory">Alt kategoriya</label>
                            <select
                                name="post_category"
                                id="post_category"
                                className="form-control"
                                onChange={postSubCategoryHandler}>
                                {subNavigations.length > 0 && subNavigations.map(subNav => {
                                    return (
                                        <option key={subNav._id} value={subNav.subnav_value}>
                                            {subNav.subnav_name_az}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-card">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="post_type">Bölmə</label>
                            <select
                                name="post_case"
                                id="post_case"
                                className="form-control"
                                onChange={postCaseHandler}>
                                {form.post_case && postCaseRender(form.post_case)}
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="post_date">Tarix</label>
                            <DatePicker
                                id="post_date"
                                className="form-control"
                                selected={form.post_date}
                                onChange={(date) => {
                                    setForm({...form, post_date: date})
                                }}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy HH:mm"
                                showTimeInput
                            />
                        </div>
                    </div>
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
                            data-bs-target="#nav-postaz"
                            aria-controls="nav-postaz"
                            aria-selected="true">
                            Az
                        </button>
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            id="nav-posten-tab"
                            data-bs-target="#nav-posten"
                            aria-controls="nav-posten"
                            aria-selected="false">En
                        </button>
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            type="button"
                            role="tab"
                            id="nav-postru-tab"
                            data-bs-target="#nav-postru"
                            aria-controls="nav-postru"
                            aria-selected="false">Ru
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div
                        className="tab-pane fade show active py-3"
                        id="nav-postaz"
                        role="tabpanel"
                        aria-labelledby="nav-postaz-tab"
                        tabIndex="0">
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Başlıq - AZ</label>
                            <input
                                type="text"
                                name="post_title_az"
                                id="post_title_az"
                                className="form-control"
                                value={form.post_title_az}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Seo - AZ</label>
                            <input
                                type="text"
                                name="post_seo_az"
                                id="post_seo_az"
                                className="form-control"
                                value={form.post_seo_az}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Qısa təsvir - AZ</label>
                            <input
                                type="text"
                                name="post_description_az"
                                id="post_description_az"
                                className="form-control"
                                value={form.post_description_az}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_view_az">Saytda görsənsin - AZ</label>
                            <select
                                name="post_view_az"
                                id="post_view_az"
                                className="form-control w-25"
                                onChange={postViewHandler}>
                                {postViewRender(form.post_view_az)}
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Kontent - AZ</label>
                            <CKEditor
                                editor={Editor}
                                config={{
                                    mediaEmbed: {
                                        previewsInData: true
                                    }
                                }}
                                data={form.post_content_az}
                                name="post_content_az"
                                onChange={(event, editor) => editorOnChange(event, editor, "post_content_az")}
                            />

                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-posten"
                        role="tabpanel"
                        aria-labelledby="nav-posten-tab"
                        tabIndex="0">
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_en">Başlıq - EN</label>
                            <input
                                type="text"
                                name="post_title_en"
                                id="post_title_en"
                                className="form-control"
                                value={form.post_title_en}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_en">Seo - EN</label>
                            <input
                                type="text"
                                name="post_seo_en"
                                id="post_seo_en"
                                className="form-control"
                                value={form.post_seo_en}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Qısa təsvir - EN</label>
                            <input
                                type="text"
                                name="post_description_en"
                                id="post_description_en"
                                className="form-control"
                                value={form.post_description_en}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_view_en">Saytda görsənsin - EN</label>
                            <select
                                name="post_view_en"
                                id="post_view_en"
                                className="form-control w-25"
                                onChange={postViewHandler}>
                                {postViewRender(form.post_view_en)}
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_en">Kontent - EN</label>
                            <CKEditor
                                editor={Editor}
                                config={{
                                    mediaEmbed: {
                                        previewsInData: true
                                    }
                                }}
                                data={form.post_content_en}
                                onChange={(event, editor) => editorOnChange(event, editor, "post_content_en")}
                            />

                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="nav-postru"
                        role="tabpanel"
                        aria-labelledby="nav-postru-tab"
                        tabIndex="0">
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_ru">Başlıq - RU</label>
                            <input
                                type="text"
                                name="post_title_ru"
                                id="post_title_ru"
                                className="form-control"
                                value={form.post_title_ru}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_ru">Seo - RU</label>
                            <input
                                type="text"
                                name="post_seo_ru"
                                id="post_seo_ru"
                                className="form-control"
                                value={form.post_seo_ru}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_az">Qısa təsvir - RU</label>
                            <input
                                type="text"
                                name="post_description_ru"
                                id="post_description_ru"
                                className="form-control"
                                value={form.post_description_ru}
                                onChange={inputTextHandler}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_view_ru">Saytda görsənsin - RU</label>
                            <select
                                name="post_view_ru"
                                id="post_view_ru"
                                className="form-control w-25"
                                onChange={postViewHandler}>
                                {postViewRender(form.post_view_ru)}
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="post_title_ru">Kontent - RU</label>
                            <CKEditor
                                editor={Editor}
                                config={{
                                    mediaEmbed: {
                                        previewsInData: true
                                    }
                                }}
                                data={form.post_content_ru}
                                onChange={(event, editor) => editorOnChange(event, editor, "post_content_ru")}
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
                    <label htmlFor="postImgfile" className="btn btn-outline-primary rounded-pill">
                        <i className="fa-solid fa-plus"></i>
                    </label>

                    <input type="file" id="postImgfile" name="file" className="d-none" onChange={onFileInputChange}/>
                </div>
            </div>
            <div className="manage-card">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            {imgUrl && <img src={imgUrl} id="img" alt="" style={{width: '100%', height: "auto"}}/>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-4 m-0 text-primary">
                        <i className="fa-solid fa-images"></i>
                    </p>
                    <label htmlFor="subImgFileInput" className="btn btn-outline-primary rounded-pill">
                        <i className="fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="subImgFileInput" multiple={true} className="d-none"
                           onChange={addFormSubImage}/>
                </div>
            </div>
            {/*Form and Db sub images*/}
            <div className="manage-card">
                <div className="container-fluid p-0">
                    <div className="row">
                        {formSubImages.length > 0 && formSubImages.map(subimg => {
                            return (
                                <div key={subimg._id} className="col-12 col-md-2 mb-2">
                                    <img src={subimg.sub_img_url} className="d-block w-100" alt=""/>
                                    <div className="d-grid gap-2 mt-1">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            type="button"
                                            data-imgurl-id={subimg._id}
                                            data-subimage-filename={subimg.sub_img_filename}
                                            onClick={() => deleteFormSubImage(subimg._id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-4 m-0 text-primary">
                        <i className="fa-solid fa-folder-tree"></i>
                    </p>
                    <label htmlFor="formFiles" className="btn btn-outline-primary rounded-pill">
                        <i className="fa-solid fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="formFiles"
                        className="d-none"
                        accept=".doc, .docx, .xls, .xlsx, .pdf"
                        onChange={addFileHandler}
                    />
                </div>
            </div>
            <div className="manage-card">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fayl</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {formFiles && formFiles.map((formFile, index) => {
                        return (<tr>
                            <th scope="row">{index + 1}</th>
                            <td>{formFile.file_original_name}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger"
                                        onClick={() => deleteFormFilesHandler(formFile.id)}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
            <div className="manage-card">
                <input type="submit" value="Əlavə et" className="btn btn-outline-primary"/>
            </div>
        </form>
    );
};

export default PostPage;