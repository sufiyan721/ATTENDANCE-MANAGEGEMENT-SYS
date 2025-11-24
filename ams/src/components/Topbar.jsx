export default function Topbar({title, subtitle}){
  return (
    <div className="topbar">
      <div>
        <h4 style={{margin:0}}>{title}</h4>
        {subtitle && <small style={{color:'#6b7280'}}>{subtitle}</small>}
      </div>
      <div>
        {/* place for user avatar or small actions */}
      </div>
    </div>
  )
}
