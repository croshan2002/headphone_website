const ITEMS = ['Adaptive ANC', '60 h battery', 'Spatial audio', 'Multipoint', 'LDAC Hi-Res', 'USB-C fast charge', '250 g']

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-label={ITEMS.join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
