import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useRequest} from "../../../hooks";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const NavigationPage = () => {

    const [navigation, setNavigation] = useState({
        navigation_order_number: 1,
        navigation_value: "",
        navigation_name_az: "",
        navigation_url_az: "",
        navigation_name_en: "",
        navigation_url_en: "",
        navigation_name_ru: "",
        navigation_url_ru: "",
    });

    const [subNavigations, setSubNavigations] = useState([]);

    const {request} = useRequest();

    const nav = useNavigate();

    const addSubHandler = () => {
        setSubNavigations([...subNavigations, {
            _id: uuidv4(),
            subnav_order_number: 1,
            subnav_value: "",
            subnav_name_az: "",
            subnav_url_az: "",
            subnav_name_en: "",
            subnav_url_en: "",
            subnav_name_ru: "",
            subnav_url_ru: "",
        }]);
    }

    const navigationHandler = event => {
        setNavigation({
            ...navigation,
            [event.target.name]: event.target.value
        });
    }

    const inputChangeHandler = event => {

        const newArr = subNavigations.map(input => {
            if (Object.keys(input).includes(event.target.name) && input._id === event.target.getAttribute('data-target-id')) {
                input[event.target.name] = event.target.value;
                return input;
            } else {
                return input;
            }
        })
        setSubNavigations([...newArr]);
    }

    const addNavigationHandler = async () => {
        console.log('NAVIGATION:', navigation);
        console.log('SUB NAVIGATION:', subNavigations);

        const navigationObjs = {
            navigation: {...navigation},
            sub_navigations: [...subNavigations]
        }


        const data = await request('/api/navigations/add', 'POST', navigationObjs);


        if (data) {
            await Swal.fire(
                'Uğurlu əməliyyat!',
                `${data.message}`,
                'success'
            ).then(() => {
                nav('/navigations', {replace: true});
            }).catch(err => {
                console.log(err);
            })
        }


    }

    return (
        <>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-4 m-0 font-500">
                        Bölmə
                    </p>
                    <Link to="/navigations" className="btn btn-outline-danger rounded-pill">
                        Geri
                    </Link>
                </div>
            </div>
            <div className="manage-card">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">Bölmə sira nömrəsi</label>
                                <input
                                    type="number"
                                    name="navigation_order_number"
                                    id="navigation_order_number"
                                    className="form-control"
                                    value={navigation.navigation_order_number}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">Bölmə dəyəri</label>
                                <input
                                    type="text"
                                    name="navigation_value"
                                    id="navigation_value"
                                    className="form-control"
                                    value={navigation.navigation_value}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">Bölmə ad - AZ</label>
                                <input
                                    type="text"
                                    name="navigation_name_az"
                                    id="navigation_name_az"
                                    className="form-control"
                                    value={navigation.navigation_name_az}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name">Bölmə linki - AZ</label>
                                <input
                                    type="text"
                                    name="navigation_url_az"
                                    id="navigation_url_az"
                                    className="form-control"
                                    value={navigation.navigation_url_az}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">Bölmə ad - EN</label>
                                <input
                                    type="text"
                                    name="navigation_name_en"
                                    id="navigation_name_en"
                                    className="form-control"
                                    value={navigation.navigation_name_en}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name">Bölmə linki - EN</label>
                                <input
                                    type="text"
                                    name="navigation_url_en"
                                    id="navigation_url_en"
                                    className="form-control"
                                    value={navigation.navigation_url_en}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="manage-card">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-5 m-0">
                        Alt bölmələr
                    </p>
                    <button className="btn btn-outline-primary rounded-pill" onClick={addSubHandler}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            {subNavigations.length > 0 && <>
                <div className="manage-card">
                    <div className="container-fluid p-0">
                        <div className="row">
                            {subNavigations.map((input, index) => {
                                return (
                                    <>
                                        <div key={index} className="col-12">
                                            <p className="m-0 fs-6 fw-500 text-primary my-2">
                                                № : {index + 1}
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt bölmə sıra nömrəsi</label>
                                                <input
                                                    type="number"
                                                    name="subnav_order_number"
                                                    id="subnav_order_number"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_order_number}
                                                    onChange={inputChangeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt bölmə dəyəri</label>
                                                <input
                                                    type="text"
                                                    name="subnav_value"
                                                    id="subnav_value"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_value}
                                                    onChange={inputChangeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt bölmə ad - AZ</label>
                                                <input
                                                    type="text"
                                                    name="subnav_name_az"
                                                    id="subnav_name_az"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_name_az}
                                                    onChange={inputChangeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name">Alt bölmə linki - AZ</label>
                                                <input
                                                    type="text"
                                                    name="subnav_url_az"
                                                    id="navigation_name"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_url_az}
                                                    onChange={inputChangeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt bölmə ad - EN</label>
                                                <input
                                                    type="text"
                                                    name="subnav_name_en"
                                                    id="subnav_name_en"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_name_en}
                                                    onChange={inputChangeHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name">Alt bölmə linki - EN</label>
                                                <input
                                                    type="text"
                                                    name="subnav_url_en"
                                                    id="subnav_url_en"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_url_en}
                                                    onChange={inputChangeHandler}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>}
            <div className="manage-card">
                <button className="btn btn-outline-primary" onClick={addNavigationHandler}>Əlavə et</button>
            </div>
        </>
    );
};

export default NavigationPage;