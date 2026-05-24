
export function Checkbox({label, checked, onChange}: {label: string, checked: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div className="fancy-checkbox-container">
            <label className="checkbox">
                <input type="checkbox" id={label} name={label} checked={checked} onChange={onChange} />
                <svg viewBox="0 0 21 18">
                    <symbol id="tick-path" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            </symbol>
            <defs>
                <mask id="tick">
                    <use className="tick mask" href="#tick-path" />
                </mask>
            </defs>
            {/* box */}
            <path className="shape" d="M1.08722 4.13374C1.29101 2.53185 2.53185 1.29101 4.13374 1.08722C5.50224 0.913124 7.25112 0.75 9 0.75C10.7489 0.75 12.4978 0.913124 13.8663 1.08722C15.4681 1.29101 16.709 2.53185 16.9128 4.13374C17.0869 5.50224 17.25 7.25112 17.25 9C17.25 10.7489 17.0869 12.4978 16.9128 13.8663C16.709 15.4681 15.4682 16.709 13.8663 16.9128C12.4978 17.0869 10.7489 17.25 9 17.25C7.25112 17.25 5.50224 17.0869 4.13374 16.9128C2.53185 16.709 1.29101 15.4681 1.08722 13.8663C0.913124 12.4978 0.75 10.7489 0.75 9C0.75 7.25112 0.913124 5.50224 1.08722 4.13374Z" />
            {/* checkmark */}
            <use className="tick" href="#tick-path" stroke="black" />
        </svg>
        <svg className="lines" viewBox="0 0 11 11">
            <path d="M5.88086 5.89441L9.53504 4.26746" />
            <path d="M5.5274 8.78838L9.45391 9.55161" />
            <path d="M3.49371 4.22065L5.55387 0.79198" />
        </svg>
    </label>
    <div className="text">{label}</div>
</div>
    )
}
