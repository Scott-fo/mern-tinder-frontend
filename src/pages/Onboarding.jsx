import React, { useState } from 'react';
import '../styles/Onboarding.css';
import Nav from '../components/Nav';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Onboarding = () => {
  
  let navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [ formData, setFormData ] = useState({
    user_id: cookie.UserId,
    first_name: '',
    DoB_day:'',
    DoB_month:'',
    DoB_year:'',
    show_gender: false,
    gender_identity: '',
    gender_interest: '',
    about: '',
    url: '',
    matches: []
  })


  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("https://scottfo-tinder.herokuapp.com/user", { formData });
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <Nav
        authToken={true}
        minimal={false}
        setShowModal={() => {}}
        showModal={false}
      />

      <div className="container">
        <h2>CREATE ACCOUNT</h2>

        <form className='onboarding-form' onSubmit={handleSubmit}>
          <section className='form-sections'>
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" placeholder="First Name" required={true} value={formData.first_name} onChange={handleChange} />
            
            <label>Birthday</label>
            <div className='birthday-section'>
              <div className="multiple-input">
                <input type="number" id="DoB_day" name="DoB_day" placeholder="DD" required={true} value={formData.DoB_day} onChange={handleChange} />
                <input type="number" id="DoB_month" name="DoB_month" placeholder="MM" required={true} value={formData.DoB_month} onChange={handleChange} />
                <input type="number" id="DoB_year" name="DoB_year" placeholder="YYYY" required={true} value={formData.DoB_year} onChange={handleChange} />
              </div>
            </div>

            <label>Gender</label>
            <div className="multiple-input">
              <input type="radio" id="male_gender_identity" name="gender_identity" value="male" onChange={handleChange} checked={formData.gender_identity === "male"} />
              <label htmlFor='male_gender_identity'>Male</label>
              <input type="radio" id="female_gender_identity" name="gender_identity" value="female" onChange={handleChange} checked={formData.gender_identity === "female"} />
              <label htmlFor='female_gender_identity'>Female</label>
              <input type="radio" id="other_gender_identity" name="gender_identity" value="other" onChange={handleChange} checked={formData.gender_identity === "other"} />
              <label htmlFor='other_gender_identity'>Other</label>
            </div>


            <label htmlFor="show_gender">
            <input className='checkbox' type="checkbox" id="show_gender" name="show_gender" onChange={handleChange} checked={formData.show_gender} /> Show gender on my profile</label>

            <label>Show me</label>
            <div className='multiple-input'>
              <input type="radio" id="male_gender_interest" name="gender_interest" value="male" onChange={handleChange} checked={formData.gender_interest === "male"} />
              <label htmlFor='male_gender_interest'>Male</label>
              <input type="radio" id="female_gender_interest" name="gender_interest" value="female" onChange={handleChange} checked={formData.gender_interest === "female"} />
              <label htmlFor='female_gender_interest'>Female</label>
              <input type="radio" id="everyone_gender_interest" name="gender_interest" value="everyone" onChange={handleChange} checked={formData.gender_interest === "everyone"} />
              <label htmlFor='everyone_gender_interest'>Everyone</label>
              
            </div>

            <label htmlFor="about">About me</label>
            <input type="text" id="about" name="about" required={true} placeholder="What do you enjoy?" value={formData.about} onChange={handleChange} />
            
            <input type="submit" />

          </section>

          <section className='form-sections'>
            <label htmlFor="photo">Profile Picture</label>
            <input type="url" name="url" id="url" required={true} onChange={handleChange} />
            <div className='photo-container'>
              {(formData.url.startsWith("https://") || formData.url.startsWith("http://")) && <img src={formData.url} alt="Profile Pic" className='profile-pic' />}
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Onboarding