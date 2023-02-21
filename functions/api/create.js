export async function onRequestPost({request}) {

  let form        = await request.json()
  const signupRsp = await createAccount(form)

  if(signupRsp.status === 500) {
    return errorRsp(['Please try later.'])
  }

  let signup = await signupRsp.json()
  let errors = parseSignupResponse(signup);

  if(errors.length > 0) {
    return errorRsp(errors)
  }

  let isEmailValid = form.email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if(! isEmailValid) {
    return errorRsp(['Email adresinizi doğrulayamadık.'])
  }

  const emailRsp = await sendEmail(form)
  if(! emailRsp.ok) {
    return errorRsp(['Epostayı gönderemedik, lütfen tekrar deneyin.'])
  }

  return new Response(JSON.stringify({
    success: true,
  }), {
    status: 200,
    headers: {
      "content-type": "application/json"
    },
  })
}

function parseSignupResponse(response) {
  let falseFlag      = "Bu cep telefonu numarası kullanımda, giriş yapmak için şifrenizi yenileyebilirsiniz."
  let errorContainer = [];

  for(const err in response.data?.error) {
    if(err.includes('is_')) {
      continue
    }

    if(response.data?.error[err] === falseFlag) {
      continue
    }

    errorContainer.push(response.data.error[err]);
  }

  return errorContainer
}

function errorRsp(errors) {
  return new Response(JSON.stringify({
    success: false,
    errNo: 422,
    errors: errors
  }), {
    status: 422,
    header: {
      "content-type": "application/json"
    }
  })
}

async function createAccount(form) {

  return fetch('https://www.iletimerkezi.com/new/panel/auth/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      aggrement: true,
      gsm: form.gsm,
      name_surname: form.name_surname,
      password: form.password,
      ref: "magesmsextension.com",
      type:	"kurumsal"
    })
  })
}

async function sendEmail(form) {

  let trContent = `
    Merhaba,
    <br />
    <br />
    Magento SMS eklentiyi indirmek için <a href="https://www.magesmsextension.com/mg1.9.zip">tıklayınız.</a>
    <br />
    <br />
    <ul>
      <li>İndirdiğiniz zip dosyasını açın,</li>
      <li>FTP ile sitenizin dosyalarınızın bulunduğu sunucuya bağlanın</li>
      <li>Zipini açtığınız dosyanın içindeki dosyaları, sunucunuza yükleyin. </li>
      <li>(System > Permissions > Roles > Administrators > Role Resources) kısmından "custom" seçeneği seçilir, daha sonra tekrar "all" kısmı seçilip kaydedilir</li>
      <li>(System > Cache Management) altında sol üst köşedeki "select all" a tıklanır, sağ üstteki "actions" bölümünden "refresh"  seçilip "submit" butonuna basılır.</li>
      <li>(Emarka SMS -> SMS Ayarları) sayfasında üyelik bilgilerinizi doldurarak sistemi kullanmaya başlayabilirsiniz.</li>
    </ul>
    <br />
    <br />
    Kurulum aşamasında herhangi bir problem yaşarsanız, bizimle <b>0212-543-4210</b> veya
    <b>
      <a href="mailto:destek@emarka.com.tr">
        destek@emarka.com.tr
      </a>
    </b> iletişime geçebilirsiniz.
  `

  let enContent = `
    Hi,
    <br />
    <br />
    Click <a href="https://www.magesmsextension.com/mg1.9.zip">to download Magento SMS plugin.</a>
    <br />
    <br />
    <ul>
      <li>Unzip the downloaded zip file,</li>
      <li>Connect with FTP to the server where your site's files are located</li>
      <li>Upload the files in the file you unzipped to your server. </li>
      <li>Select "custom" from (System > Permissions > Roles > Administrators > Role Resources), then select "all" again and save</li>
      <li>Under (System > Cache Management), click "select all" in the upper left corner, select "refresh" from the "actions" section in the upper right and click the "submit" button.</li>
      <li>You can start using the system by filling in your membership information on the (Emarka SMS -> SMS Settings) page.</li>
    </ul>
    <br />
    <br />
    If you have any problems during installation, contact us at <b>0212-543-4210</b> or
    <b>
      <a href="mailto:destek@emarka.com.tr">
        destek@emarka.com.tr
      </a>
    </b> you can contact us.
  `

  let trSubject = 'Magento SMS Eklenti Kurulum Bilgileri'
  let enSubject = 'Magento SMS Addon Setup Information'

  return fetch(new Request('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: form.email, name: form.name_surname }],
          },
        ],
        from: {
          email: 'no-reply@magesmsextension.com',
          name: 'Magento SMS',
        },
        subject: form.lang === 'tr' ? trSubject : enSubject,
        content: [
          {
            type: 'text/html',
            value: form.lang === 'tr' ? trContent : enContent,
          },
        ],
      }),
  }))
}