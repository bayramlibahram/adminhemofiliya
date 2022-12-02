import React, {useCallback, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Axios from "axios";
import {BACK_END} from "../../config/keys";
import {Spinner} from "../../components";

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

    console.log(navigation);

    const [formNavigation, setFormNavigation] = useState(navigation);

    const navigationHandler = event => {
        setFormNavigation({
            ...formNavigation,
            [event.target.name]: event.target.value
        });
    }

    const inputChangeHandler = event => {

        setFormNavigation({
            ...formNavigation,
        })
    }

    const addSubHandler = () => {

    }

    const editNavigation = async event => {
        event.preventDefault()
    }


    return (
        <form onSubmit={editNavigation}>
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
                                    value={formNavigation.navigation_order_number}
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
                                    value={formNavigation.navigation_value}
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
                                    value={formNavigation.navigation_name_az}
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
                                    value={formNavigation.navigation_url_az}
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
                                    value={formNavigation.navigation_name_en}
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
                                    value={formNavigation.navigation_url_en}
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
            {formNavigation.sub_navigations.length > 0 && <>

                <div className="container-fluid">
                    <div className="row">
                        {formNavigation.sub_navigations.map((input, index) => {
                            return (
                                <div key={input._id} className="col-12">
                                       <div className="manage-card row">
                                           <div className="col-12">
                                               <p className="m-0 fs-6 fw-500 text-primary">
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
                                                       onChange={event => inputChangeHandler(event)}
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
                                       </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </>}
            <div className="manage-card">
                <button className="btn btn-outline-warning">Dəyiş</button>
            </div>
        </form>
    )
}

export default EditNavigationPage;