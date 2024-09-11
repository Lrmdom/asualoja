import React from 'react'
import {EmblaOptionsType} from 'embla-carousel'
import {DotButton, useDotButton} from './js/EmblaCarouselDotButton'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './js/EmblaCarouselArrowButtons'
import {useCallback, useEffect} from 'react'
import {EmblaCarouselType, EmblaEventType} from 'embla-carousel'

import useEmblaCarousel from 'embla-carousel-react'


import './embla.css'
import {stegaClean} from "@sanity/client/stega";

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const {slides, options} = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const {selectedIndex, scrollSnaps, onDotButtonClick} =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    const logEmblaEvent = useCallback(
        (emblaApi: EmblaCarouselType, eventName: EmblaEventType) => {
            const sku = props.slides[emblaApi.slidesInView()[1]].sku
            let elements = document.getElementsByClassName(sku)
            props.setSelectedSku(sku)
            /*
                        props.setEmblaImage(props.slides[emblaApi.slidesInView()[1]].url)
            */
            props.slides[emblaApi.slidesInView()[1]].attributes?.map((attr) => {
                Reg_Exp.test(stegaClean(attr.value)) ? props.setSelectedColor(stegaClean(attr.value)) : props.setSelectedSize(stegaClean(attr.value))
            })
        },
        []
    )
    useEffect(() => {
        if (emblaApi) emblaApi.on('select', logEmblaEvent)
    }, [emblaApi, logEmblaEvent])

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container border  rounded p-1">
                    {slides?.map((s, index) => (
                        <div className="embla__slide" key={index}>
                            <img src={s.url} width={300} alt={s.alt} className="rounded border-2 bg-gray-50"/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                </div>


                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
