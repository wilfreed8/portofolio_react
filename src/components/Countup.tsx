import { NumberTicker } from "./ui/number-ticker";

export function Countup({className,prefixe,suffixe,value,delay,startValue}) {
  return (
    <div className={className}>
      <span>{prefixe}</span>
      <NumberTicker
        value={value}
        delay={delay}
        startValue={startValue}
      />
      <span>{suffixe}</span>
    </div>
  )
}
