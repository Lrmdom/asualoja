import React, {useCallback, useEffect} from 'react'
import {EmblaCarouselType, EmblaEventType, EmblaOptionsType} from 'embla-carousel'
import {DotButton, useDotButton} from './js/EmblaCarouselDotButton'
import {NextButton, PrevButton, usePrevNextButtons} from './js/EmblaCarouselArrowButtons'

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


    props.emblaImage ? emblaApi.scrollTo(props.emblaImage, true) : null
    //debugger;
    const logEmblaEvent = useCallback(
        (emblaApi: EmblaCarouselType, eventName: EmblaEventType) => {
            let index = emblaApi.selectedScrollSnap()
            const sku = props.slides[index].sku
            //debugger
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
            {/*<div className="embla-thumbs">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container">
                        {slides.map((index) => (
                            <Thumb
                                key={index}
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>*/}
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
