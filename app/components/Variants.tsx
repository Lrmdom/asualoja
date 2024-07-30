import {stegaClean} from "@sanity/client/stega"
import Attributes from "~/components/Attributes"
import { CommerceLayer,AvailabilityContainer,AvailabilityTemplate } from "@commercelayer/react-components";

/*import * as pkg from '@commercelayer/react-components';
const { CommerceLayer,AvailabilityContainer,AvailabilityTemplate } = pkg;*/


export default function Variants({product}: { product: SanityDocument }) {
    /*const {
        variants
    } = product*/
    if (Array.isArray(product.variants)) {
        null
    } else {
        return null
    }

    return (
        <main className="container mx-auto prose prose-lg p-4 border-4">

            {product.variants.map((variant) => {
                return (
                    <>
                        {/*<cl-add-to-cart code={variant.sku} quantity="1" kind="sku">
                            Add to cart
                        </cl-add-to-cart>*/}
                        <div key={variant._id}>

                            <div>
                                <img src={variant.images ? variant.images[0].url : null} width={75}
                                     alt={variant.title}/>
                            </div>
                            <span>
                            {variant.title}
                          </span>
                            <span>
                              <cl-price code={stegaClean(variant.sku)}>
          <cl-price-amount type="compare-at"></cl-price-amount>
          <cl-price-amount type="price"></cl-price-amount>
        </cl-price>
        <cl-add-to-cart kind="sku" code={stegaClean(variant.sku)} quantity="1">
          Add to cart
        </cl-add-to-cart>
                                <cl-availability code={stegaClean(variant.sku)}>
  <cl-availability-status type="available" style={{color: "green"}}>
    • available
  </cl-availability-status>
  <cl-availability-status type="available-with-info">
    ready to be shipped in
    <cl-availability-info type="min-days"></cl-availability-info>-<cl-availability-info
      type="max-days"></cl-availability-info> days
    with <cl-availability-info type="shipping-method-name"></cl-availability-info> (<cl-availability-info
      type="shipping-method-price"></cl-availability-info>)
  </cl-availability-status>
  <cl-availability-status type="unavailable" style={{color: "red"}}>
    • out of stock
  </cl-availability-status>
</cl-availability>

                            </span>
                            <CommerceLayer
                                endpoint="https://execlog.commercelayer.io"
                                accessToken="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ4eWVnYkZqUU5uIiwic2x1ZyI6ImV4ZWNsb2ciLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiR1lkcWlQalZnTiIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwic2NvcGUiOiJtYXJrZXQ6YWxsIiwiZXhwIjoxNzIyMzYyODIzLCJ0ZXN0Ijp0cnVlLCJyYW5kIjowLjQ0ODY4Mjk1OTgzMzA3MzA1LCJpYXQiOjE3MjIzNDg0MjMsImlzcyI6Imh0dHBzOi8vY29tbWVyY2VsYXllci5pbyJ9.jCafaSTM0LgmacyIthF2OW7WZ7T3fF2Y4rD5ksYVpoNcLPbt2tPjhROuTUsXriXiwViWEl9fbMK7yfyKvJABUO3UPpuVhA45BO2U0ubmDMyFWD-SjeeV3sm6py3FZ6F7uCD_BYGJRyva_IF_nsx9Cxxq1GcddebgctGfbCcLFonOJj9qm9_D4Mly16vdbkqqVHuii0Pz7Smsf52iOWCPk3PTZSlMtwDAQfNKU6i92FNXRCDXRXtQy7cENHKY3zUgQOk5HPUZ_ks7g8zUwCsC9FZJFJ95jBzmuWa59TCnz25W1Nxlm-zWvc15ir3WG39QTLcRYAun5VWSIH-57LN-mGGaatYmm4eP8mK8Cx_wMEUJ85AuuwqPncLAwjy_CXl14UEKr3m6bewR4pelgRrsdRey6u5dy14w1ICGEIP3fOWQw8AN8hK3JUViVygGCUO1viP_pwttFce-COYiXF3dgv4h-umPwmfyVFCiMya-IdJxY0fbU7pQUYnuIGA2ilga4uh5pg2slvFiUN8kfTW_KGuh4FF4hFozQ7PwoOQZwiVepDIa7-X2cBo52NVJuRjC9mh-2hi0x8NEhpvqEODCYm4NhKqvm8HnTy_DAQfBXF-eg6F7bNwoVzb2kmNTPj0IqeAY7Rj6Y-62JE1nvAizqPOeLr8HrnZLfriyRtwgmlA">
                                <AvailabilityContainer skuCode={variant.sku}>
                                    <AvailabilityTemplate
                                        showShippingMethodName
                                        showShippingMethodPrice
                                        timeFormat="days"
                                    />
                                </AvailabilityContainer>
                            </CommerceLayer>

                            <Attributes product={variant}></Attributes>
                            <cl-cart-count></cl-cart-count>
                            <cl-cart-link target="_blank">View cart</cl-cart-link>
                            <cl-checkout-link target="_blank">
                                Proceed to checkout
                            </cl-checkout-link>
                        </div>
                    </>
                )
            })}
        </main>
    )
}



