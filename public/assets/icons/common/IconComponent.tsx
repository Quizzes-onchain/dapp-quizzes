import { SVGProps } from 'react'

export const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none' {...props}>
    <path
      stroke={props.stroke || '#18191B'}
      strokeLinecap={props.strokeLinecap || 'round'}
      strokeLinejoin={props.strokeLinejoin || 'round'}
      strokeWidth={props.width || 1.5}
      d='M15.833 7.5 10 12.5l-5.833-5'
    />
  </svg>
)

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <g filter='url(#filter0_b_468_43084)'>
      <rect width='24' height='24' rx='12' fill='white' />
      <path
        d='M15.9956 8.00346L8.00391 15.9951'
        stroke={props.stroke || '#A5A5B5'}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M15.9983 16L8 8' stroke={props.stroke || '#A5A5B5'} strokeLinecap='round' strokeLinejoin='round' />
    </g>
    <defs>
      <filter
        id='filter0_b_468_43084'
        x='-80'
        y='-80'
        width='184'
        height='184'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='40' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_468_43084' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_468_43084' result='shape' />
      </filter>
    </defs>
  </svg>
)

export const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M17.7082 10.0004C17.7082 14.2579 14.2573 17.7088 9.99984 17.7088C5.74234 17.7088 2.2915 14.2579 2.2915 10.0004C2.2915 5.74292 5.74234 2.29208 9.99984 2.29208C14.2573 2.29208 17.7082 5.74292 17.7082 10.0004Z'
      stroke={props.stroke || '#18191B'}
      strokeWidth={props.strokeWidth || '1.25'}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12.8594 12.4524L9.71777 10.5782V6.53906'
      stroke={props.stroke || '#18191B'}
      strokeWidth='1.25'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fill-rule='evenodd'
      clipRule='evenodd'
      d='M10.5953 2.86736L12.5253 6.74986C12.6219 6.94569 12.8086 7.08236 13.0253 7.11402L17.3461 7.73819C17.5211 7.76152 17.6786 7.85319 17.7861 7.99319C17.9878 8.25569 17.9569 8.62736 17.7153 8.85319L14.5836 11.8815C14.4244 12.0315 14.3536 12.2515 14.3953 12.4657L15.1453 16.739C15.1978 17.0932 14.9561 17.4249 14.6019 17.4824C14.4553 17.5049 14.3053 17.4815 14.1719 17.4157L10.3236 15.3982C10.1303 15.2932 9.8986 15.2932 9.70527 15.3982L5.8286 17.4265C5.50444 17.5915 5.10777 17.469 4.9311 17.1515C4.8636 17.0232 4.84027 16.8774 4.8636 16.7349L5.6136 12.4615C5.6511 12.2482 5.58027 12.029 5.42527 11.8782L2.27694 8.85069C2.02027 8.59569 2.0186 8.18069 2.27444 7.92402C2.27527 7.92319 2.2761 7.92153 2.27694 7.92069C2.38277 7.82486 2.51277 7.76069 2.6536 7.73569L6.97527 7.11153C7.1911 7.07736 7.37694 6.94236 7.47527 6.74652L9.4036 2.86736C9.4811 2.70986 9.6186 2.58903 9.78527 2.53403C9.95277 2.47819 10.1361 2.49153 10.2936 2.57069C10.4228 2.63486 10.5286 2.73903 10.5953 2.86736Z'
      stroke={props.stroke || '#18191B'}
      strokeWidth={props.strokeWidth || '1.25'}
      strokeLinecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
