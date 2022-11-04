import React from 'react';
import Translate from '@docusaurus/Translate';

const FirstFeatures = [
  {
    title: <Translate>Kargo Bildirimi</Translate>,
    description: <Translate>Müşterilerinize satın aldığı ürün kargoya verildi, tahmini ulaşım süresini bildirin.</Translate>
  },
  {
    title: <Translate>15 Farklı Senaryo</Translate>,
    description: <Translate>Sisteminizde oluşan 15'e yakın olaya sms bildirimi ekleyin.</Translate>,
  },
  {
    title: <Translate>Tüm Dünyaya SMS Gönderin</Translate>,
    description: <Translate>Yurtdışı SMS gönderimi ile tüm dünyadaki müşterilerinize direkt ulaşın!</Translate>
  }
];

const SecondFeatures = [
  {
    title: <Translate>Ücret Ödemeden Deneyin</Translate>,
    description: <Translate>Eklenti için herhangi bir ödeme yapmazsınız, sadece gönderdiğiniz smsler ücretlendirilir.</Translate>
  },
  {
    title: <Translate>En Son Versiyonla Uyumlu</Translate>,
    description: <Translate>Sürekli güncellenen eklenti ile en son sürüm WHMCS versiyonu ile kullanabilirsiniz.</Translate>
  },
  {
    title: <Translate>Müşteri Sadakatini Arttırın</Translate>,
    description: <Translate>Müşterilerinize sipariş durumu hakkında bildirimde bulunarak, hem müşterinizin güvenini kazanın.</Translate>
  }
];

function Feature({title, description}) {
  return (
    <div className="card">
      <div className="card__header">
        <h3>{title}</h3>
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className='padding-top--lg padding-bottom--lg'>
      <div className="container">
        <div className="row">
          {FirstFeatures.map((props, idx) => (
						<div key={`first-${idx}`} className='col col--4 margin-top--md'>
            	<Feature key={idx} {...props} />
						</div>
          ))}
        </div>
				<div className="row">
          {SecondFeatures.map((props, idx) => (
						<div key={`second-${idx}`} className='col col--4 margin-top--md'>
            	<Feature key={idx} {...props} />
						</div>
          ))}
        </div>
      </div>
    </section>
  );
}
