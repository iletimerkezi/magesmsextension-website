import React from 'react';
import chunks from 'array.chunk'
import Translate from '@docusaurus/Translate';
import reactStringReplace from 'react-string-replace'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const SampleTrList  = [
  "Müşteriniz yeni bir sipariş oluşturdu sipariş numarası: %orderid%.",
  "Sayın %firstname% %lastname%, %orderid% numaralı siparişinizin kargo takip numarası %trackingnumber%.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişinizin durumu kargoya verildi olarak değiştirildi.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişiniz işleme alındı.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişiniz iptal edildi.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişiniz tamamlandı.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişinizin iade işlemi tamamlandı.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişiniz stoklarda olmadığı için iptal edildi.",
  "Sayın %firstname% %lastname%, %orderid% nolu siparişiniz için para iadesi kredi kartınıza yansıtıldı."
]

const SampleEnList  = [
  "Your customer has created a new order with order number: %orderid%.",
   "Mr. %firstname% %lastname%, the shipping tracking number of your order with %orderid% %trackingnumber%.",
   "Dear %firstname% %lastname%, the status of your order %orderid% has been changed to shipped.",
   "Dear %firstname% %lastname%, your order %orderid% has been processed.",
   "Dear %firstname% %lastname%, your order %orderid% has been cancelled.",
   "Dear %firstname% %lastname%, your order %orderid% has been completed.",
   "Mr. %firstname% %lastname%, the return of your order %orderid% has been completed.",
   "Mr. %firstname% %lastname%, your order %orderid% has been canceled because it is out of stock.",
   "Dear %firstname% %lastname%, the refund for your order %orderid% has been credited to your credit card."
]

function SMS({body}) {

  const message = reactStringReplace(
    body,
    /(\%.*?\%)/gm,
    (match, i) => <span key={`sms-${i}`} className="badge badge--cta">{match}</span>
  );

  return (
    <div className="col col--4 margin-top--md">
      <div className="card card-samples">
        <div className="card__body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default function Samples() {
  const {i18n} = useDocusaurusContext();
  let rows     = chunks(i18n.currentLocale === 'en' ? SampleEnList : SampleTrList, 3)

  const samples = rows.map((cols, idx) => {
    let row = cols.map((body, idx) => {
      return <SMS key={`sms-${idx}`} body={body} />
    })

    return <div key={`row-${idx}`} className="row">{row}</div>
  })

  return (
    <section className="samples padding-top--lg padding-bottom--lg">
      <div className="container">
				<h5 className="welcome-title">
					<Translate>Neler Yapabilirsiniz?</Translate>
				</h5>
        {samples}
      </div>
    </section>
  );
}
