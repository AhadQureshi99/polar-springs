const SHOWROOMS = [
  {
    id: 1,
    name: 'Polar Springs Brockville Showroom',
    address: '1111 Development Dr, Brockville, ON K6V 7G2',
    mapSrc:
      'https://www.google.com/maps?q=1111+Development+Dr,+Brockville,+ON+K6V+7G2&output=embed',
    directionsHref:
      'https://www.google.com/maps/dir/?api=1&destination=1111+Development+Dr,+Brockville,+ON+K6V+7G2',
    phone: '613-572-2777',
    hours: [
      { days: 'Mon – Thurs', time: '9am – 1pm' },
      { days: 'Fri – Sun',   time: '9am – 5pm' },
    ],
  },
  {
    id: 2,
    name: 'Polar Springs Ottawa Showroom',
    address: 'Ottawa, ON — Coming Soon',
    mapSrc:
      'https://www.google.com/maps?q=Ottawa,+ON,+Canada&output=embed',
    directionsHref:
      'https://www.google.com/maps/dir/?api=1&destination=Ottawa,+ON,+Canada',
    phone: '613-572-2777',
    hours: [
      { days: 'Mon – Thurs', time: '9am – 1pm' },
      { days: 'Fri – Sun',   time: '9am – 5pm' },
    ],
  },
]

export default function ShowroomsSection() {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">

        {/* ── Intro text ── */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ontario's Largest Hot Tub &amp; Sauna Showrooms!
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-4xl mb-12 leading-relaxed">
          Come in store to explore our full range in person. From hot tubs and swim spas to
          saunas and cold plunges, you can see the quality up close, test out features, and
          get expert advice from our friendly team. There's nothing like experiencing it for
          yourself.
        </p>

        {/* ── Showroom cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
          {SHOWROOMS.map((room) => (
            <ShowroomCard key={room.id} room={room} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ShowroomCard({ room }) {
  const { name, address, mapSrc, directionsHref, phone, hours } = room

  return (
    <div>
      {/* Name + address */}
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{address}</p>

      {/* Map */}
      <div className="w-full h-64 md:h-72 rounded overflow-hidden border border-gray-200 mb-5">
        <iframe
          title={`Map – ${name}`}
          src={mapSrc}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>

      {/* Hours */}
      <p className="font-bold text-gray-900 mb-1">Open 7 Days</p>
      {hours.map(({ days, time }) => (
        <p key={days} className="text-gray-600 text-sm">
          {days}: {time}
        </p>
      ))}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-5">
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#fbc92e] hover:bg-[#e0b020] text-gray-900 font-bold text-sm px-6 py-3 rounded transition-colors whitespace-nowrap"
        >
          Get Directions <span aria-hidden="true">→</span>
        </a>
        <a
          href={`tel:${phone.replace(/-/g, '')}`}
          className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-bold text-sm px-6 py-3 rounded transition-colors whitespace-nowrap"
        >
          Call: {phone}
        </a>
      </div>
    </div>
  )
}
