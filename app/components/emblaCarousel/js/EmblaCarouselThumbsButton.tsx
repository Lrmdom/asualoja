import React from 'react'

type PropType = {
    selected: boolean
    index: number
    onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, index, onClick } = props

    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                type="button"
                className="embla-thumbs__slide__number"
            >
                <img src={index.url} width={300} alt={index.alt} className="rounded border-2 bg-gray-50"/>
            </button>
        </div>
    )
}
