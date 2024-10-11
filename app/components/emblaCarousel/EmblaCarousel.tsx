import React, {useCallback, useEffect} from 'react'
import {EmblaCarouselType, EmblaEventType, EmblaOptionsType} from 'embla-carousel'
import {NextButton, PrevButton, usePrevNextButtons} from './js/EmblaCarouselArrowButtons'

import useEmblaCarousel from 'embla-carousel-react'


import './embla.css'
import {stegaClean} from "@sanity/client/stega";
import {useLocation} from "@remix-run/react";

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const {slides, options} = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    props.setEmblaImage(props.emblaImageDetail)

    props.emblaImage ? emblaApi.scrollTo(props.emblaImage, true) : null
    const logEmblaEvent = useCallback(
        (emblaApi: EmblaCarouselType, eventName: EmblaEventType) => {
            let index = emblaApi.selectedScrollSnap()
            const sku = props.slides[index].sku
            props.setSelectedSku(sku)
            props.setEmblaImage(index)

            props.slides[index].attributes?.map((attr) => {
                props.handleAttributeChange(stegaClean(attr.name.toUpperCase()), stegaClean(attr.value.toUpperCase()))
            })

        },
        []
    )
    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', logEmblaEvent)
            props.emblaImage ? emblaApi.scrollTo(props.emblaImage, true) : null
        }
    }, [emblaApi, logEmblaEvent])

    let urlParts = useLocation().pathname.split('/').length


    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="rounded border p-1 embla__container">
                    {slides?.map((s, index) => (
                        <div className="embla__slide" key={index}>
                            <img src={s.url} width={urlParts >= 5 ? 500 : 300} alt={s.alt}
                                 className="rounded border-2 bg-gray-50"/>
                        </div>
                    ))}
                </div>
            </div>
            {
                urlParts <= 4 ?

                    <div className="embla__controls">
                        <div className="embla__buttons">
                            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                        </div>

                    </div>
                    : null}
        </section>
    )
}

export default EmblaCarousel
