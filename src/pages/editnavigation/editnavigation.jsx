import {useCallback, useEffect, useState} from 'react';
import {ManageCard, Spinner} from "../../components";
import {Link, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";
import {BACK_END} from "../../config/keys";
import Swal from "sweetalert2";
import {v4 as uuidv4} from "uuid";

const EditNavigationPage = () => {

    const navigationId = useParams().id;
    const [navigation, setNavigation] = useState(null);

    const fetchNavigation = useCallback(async () => {
        const response = await Axios.get(`${BACK_END.HOST}/api/navigations/${navigationId}`);
        const data = response.data;
        setNavigation(data);
    }, [navigationId])

    useEffect(() => {
        fetchNavigation()
            .then(() => {
                console.log('Navigations fetched successfully!')
            })
            .catch((err) => {
                console.log(err)
            })
    }, [fetchNavigation]);

    if (!navigation) return <Spinner/>

    return (
        <EditNavigationForm navigation={navigation}/>
    );
};

const EditNavigationForm = ({navigation}) => {

    const nav = useNavigate();

    const [formNavigation, setFormNavigation] = useState(navigation);

    const navigationHandler = event => {
        setFormNavigation({
            ...formNavigation,
            [event.target.name]: event.target.value
        });
    }

    const inputChangeHandler = (event, _id) => {

        const newArr = formNavigation.sub_navigations.map(nav => {
            if (nav._id === _id) {
                if (event.target.name.toString() === "subnav_order_number") {
                    nav[event.target.name] = parseInt(event.target.value);
                } else {
                    nav[event.target.name] = event.target.value
                }
            }
            return nav
        });

        setFormNavigation({
            ...formNavigation,
            sub_navigations: [...newArr],
        });
    }

    const addSubHandler = event => {
        event.preventDefault();
        const newInput = {
            _id: uuidv4(),
            subnav_order_number: 0,
            subnav_value: "",
            subnav_name_az: "",
            subnav_url_az: "",
            subnav_name_en: "",
            subnav_url_en: "",
            subnav_name_ru: "",
            subnav_url_ru: "",
        }

        setFormNavigation({
            ...formNavigation,
            sub_navigations: [...formNavigation.sub_navigations, {...newInput}]
        });
    }

    const deleteSubNavigation = (event, _id) => {
        event.preventDefault();

        const newSubNavigationArr = formNavigation.sub_navigations.filter(subNav => subNav._id !== _id);

        setFormNavigation({
            ...formNavigation,
            sub_navigations: [...newSubNavigationArr]
        });

    }

    const editNavigation = async event => {
        event.preventDefault();

        const response = await Axios.post(`${BACK_END.HOST}/api/navigations/edit`, formNavigation);
        const data = response.data;

        if (data) {
            await Swal.fire(
                'U??urlu ??m??liyyat!',
                `${data.message}`,
                'success'
            ).then(() => {
                nav('/navigations', {replace: true});
            }).catch(err => {
                console.log(err);
            });
        }

    }


    return (
        <form onSubmit={editNavigation}>
            <ManageCard>
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-4 m-0 font-500">B??lm??</p>
                    <Link to="/navigations" className="btn btn-outline-danger rounded-pill">Geri</Link>
                </div>
            </ManageCard>

            <ManageCard>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">B??lm?? sira n??mr??si</label>
                                <input
                                    type="number"
                                    name="navigation_order_number"
                                    id="navigation_order_number"
                                    className="form-control"
                                    value={formNavigation.navigation_order_number}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">B??lm?? d??y??ri</label>
                                <input
                                    type="text"
                                    name="navigation_value"
                                    id="navigation_value"
                                    className="form-control"
                                    value={formNavigation.navigation_value}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">B??lm?? ad - AZ</label>
                                <input
                                    type="text"
                                    name="navigation_name_az"
                                    id="navigation_name_az"
                                    className="form-control"
                                    value={formNavigation.navigation_name_az}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name">B??lm?? linki - AZ</label>
                                <input
                                    type="text"
                                    name="navigation_url_az"
                                    id="navigation_url_az"
                                    className="form-control"
                                    value={formNavigation.navigation_url_az}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name_az">B??lm?? ad - EN</label>
                                <input
                                    type="text"
                                    name="navigation_name_en"
                                    id="navigation_name_en"
                                    className="form-control"
                                    value={formNavigation.navigation_name_en}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="form-group">
                                <label htmlFor="navigation_name">B??lm?? linki - EN</label>
                                <input
                                    type="text"
                                    name="navigation_url_en"
                                    id="navigation_url_en"
                                    className="form-control"
                                    value={formNavigation.navigation_url_en}
                                    onChange={navigationHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ManageCard>

            <ManageCard>
                <div className="d-flex align-items-center justify-content-between">
                    <p className="fs-5 m-0">
                        Alt b??lm??l??r
                    </p>
                    <button className="btn btn-outline-primary rounded-pill" onClick={addSubHandler}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </ManageCard>

            {formNavigation.sub_navigations.length > 0 &&
                <div className="container-fluid">
                    <div className="row">
                        {formNavigation.sub_navigations.map((input, index) => {
                            return (
                                <div key={input._id} className="col-12">
                                    <ManageCard customClass="row">
                                        <div className="col-6">
                                            <p className="m-0 fs-6 fw-500 text-primary">
                                                ??? : {index + 1}
                                            </p>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <button className="btn btn-sm btn-danger ms-2"
                                                    onClick={event => deleteSubNavigation(event, input._id)}>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt b??lm?? s??ra n??mr??si</label>
                                                <input
                                                    type="number"
                                                    name="subnav_order_number"
                                                    id="subnav_order_number"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_order_number}
                                                    onChange={event => inputChangeHandler(event, input._id)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt b??lm?? d??y??ri</label>
                                                <input
                                                    type="text"
                                                    name="subnav_value"
                                                    id="subnav_value"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_value}
                                                    onChange={event => inputChangeHandler(event, input._id)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt b??lm?? ad - AZ</label>
                                                <input
                                                    type="text"
                                                    name="subnav_name_az"
                                                    id="subnav_name_az"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_name_az}
                                                    onChange={event => inputChangeHandler(event, input._id)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name">Alt b??lm?? linki - AZ</label>
                                                <input
                                                    type="text"
                                                    name="subnav_url_az"
                                                    id="navigation_name"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_url_az}
                                                    onChange={event => inputChangeHandler(event, input._id)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name_az">Alt b??lm?? ad - EN</label>
                                                <input
                                                    type="text"
                                                    name="subnav_name_en"
                                                    id="subnav_name_en"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_name_en}
                                                    onChange={event => inputChangeHandler(event, input._id)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="navigation_name">Alt b??lm?? linki - EN</label>
                                                <input
                                                    type="text"
                                                    name="subnav_url_en"
                                                    id="subnav_url_en"
                                                    className="form-control"
                                                    data-target-id={input._id}
                                                    value={input.subnav_url_en}
                                                    onChange={event => inputChangeHandler(event, input._id)}
                                                />
                                            </div>
                                        </div>
                                    </ManageCard>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
            <ManageCard>
                <button className="btn btn-outline-warning">D??yi??</button>
            </ManageCard>
        </form>
    )
}

export default EditNavigationPage;