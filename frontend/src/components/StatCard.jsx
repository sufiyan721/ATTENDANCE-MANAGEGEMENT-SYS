export default function StatCard({title,value,sub}){
  return (
    <div className="card stat-item">
      <h5>{title}</h5>
      <h3 style={{color:'#1a1a1a'}}>{value}</h3>
      {sub && <small style={{color:'#6b7280'}}>{sub}</small>}
    </div>
  )
}
