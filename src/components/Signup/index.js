import Translate from '@docusaurus/Translate';
import React, {Fragment, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const BackendErrors = {
  "Ad Soyad alanını doldurmalısınız.": "The name surname field is required.",
  "Cep Telefonu alanını doldurmalısınız.": "The gsm field is required.",
  "Şifre alanını doldurmalısınız.": "The password field is required.",
  "name surname değeri 6 karakterden büyük olmalıdır.": "The name surname must be at least 6 characters.",
  "gsm 10 karakter olmalıdır.": "The phone number must be 10 characters.",
  "password değeri 6 karakterden büyük olmalıdır.": "The password must be at least 6 characters.",
  "Email adresinizi doğrulayamadık.": "Please enter valid email address.",
  "Epostayı gönderemedik, lütfen tekrar deneyin.": "Please try again, we could not send the email to your email address.",
  "İnternet bağlantınızı kontrol edip tekrar deneyiniz.": "Please check your internet connection."
};

export default function Signup() {
  const {i18n}                = useDocusaurusContext();
  const [errors, setErrors]   = useState([])
  const [success, setSuccess] = useState(false)
  const [isLoad, setLoad]     = useState(false)
  const [form, setForm]       = useState({
    name_surname: '',
    email: '',
    gsm: '',
    password: '',
    lang: i18n.currentLocale
  })

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const save = () => {

    setLoad(true)

    fetch('/api/create', {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => response.json())
    .then(json => {
      if(json.success) {
        setSuccess(true)
      } else {
        setErrors(json.errors)
      }

      setLoad(false)
    })
    .catch((err) => {
      setErrors(['İnternet bağlantınızı kontrol edip tekrar deneyiniz.'])
      setLoad(false)
    })
  }

  if(success) {
    return (
      <section>
        <div id="download" className="container signup padding-vert--xl">
          <div className="row">
            <div className="col">
              <div className="alert alert--success" role="alert">
                <Translate>Email adresinize kurulum linki ve açıklamalarını gönderdik.</Translate>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div id="download" className="container signup padding-vert--xl">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card__header welcome-title signup-header">
                <h3>
                  <Translate>Ücretsiz olarak üye olun ve deneyin!</Translate>
                </h3>
              </div>
              <div className="card__body">
                {errors.length > 0 ? (
                  <div className="alert alert--danger" role="alert">
                    {errors.map((error, idx) => {
                      return (
                        <Fragment key={`signup-err-${idx}`}>
                          {i18n.currentLocale === 'tr' ? error : BackendErrors[error]}
                          <br />
                        </Fragment>)
                    })}
                  </div>
                ):null}
                <Form
                  form={form}
                  onChange={onChange}
                  save={save}
                  isLoad={isLoad} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Form({form, onChange, save, isLoad}) {

  return (
    <>
      <div className="margin-top--md margin-bottom--md form-floating">
        <input
          name="name_surname"
          placeholder=""
          type="text"
          id="floatingNameSurname"
          className="form-control"
          onChange={onChange}
          value={form.name_surname} />
        <label htmlFor="floatingNameSurname">
          <Translate>İsim Soyisim</Translate>
        </label>
      </div>
      <div className="margin-bottom--md form-floating">
        <input
          name="email"
          placeholder=""
          type="text"
          id="floatingEmail"
          className="form-control"
          onChange={onChange}
          value={form.email} />
        <label htmlFor="floatingEmail">
          <Translate>Email Adresi</Translate>
        </label>
      </div>
      <div className="margin-bottom--md form-floating">
        <input
          name="gsm"
          placeholder=""
          type="text"
          id="floatingGsm"
          className="form-control"
          onChange={onChange}
          value={form.gsm} />
        <label htmlFor="floatingGsm"><Translate>Cep Telefonu</Translate></label>
      </div>
      <div className="margin-bottom--md form-floating">
        <input
          name="password"
          placeholder=""
          type="text"
          id="floatingPassword"
          className="form-control"
          onChange={onChange}
          value={form.password} />
        <label htmlFor="floatingPassword">
          <Translate>Şifre</Translate>
        </label>
      </div>
      <button
        disabled={isLoad}
        onClick={save}
        className="button btn-cta button--block button--lg button--primary">
        <Translate>Üye Olun ve İndirin</Translate>
      </button>
    </>
  )
}
