import fUllStar from "../../assets/icons/fUllStar.svg"
import emptyStar from "../../assets/icons/emptyStar.svg"
import { SetStateAction } from "react"

export function Stars({value}: {value: number}) {
    const data = [
        {full: fUllStar, empty: emptyStar},
        {full: fUllStar, empty: emptyStar},
        {full: fUllStar, empty: emptyStar},
        {full: fUllStar, empty: emptyStar},
        {full: fUllStar, empty: emptyStar}
    ]

    const content = data.map((item, index) => {
        return (index < value) ? <img src={item.full} alt='' /> : <img src={item.empty} alt='' />;
    })

    return (
        <label className='flex gap-2 items-center'>
            {content}
            <p> && Up</p>
        </label>
    )
}

export default function CustomerReview({setReviewRange, reviewRange}: {setReviewRange: React.Dispatch<SetStateAction<number>>, reviewRange: number}) {

    const data = [
        {id: 4, value: '4'},
        {id: 3, value: '3'},
        {id: 2, value: '2'},
        {id: 1, value: '1'}
    ]

    const review = data.map(element => {
        return (
            <div key={element.id} className="flex gap-2 items-center">
                <input
                    type="radio"
                    name="reviewRange"
                    value={element.id}
                    checked={(reviewRange > 0)}
                    onChange={() => setReviewRange(element.id)}
                />
                <Stars value={element.id} />
            </div>
        )
    })

    return (
        <figure className='flex flex-col w-full'>
            <div className='border-t-2 border-l-gray-400 w-full mb-4'></div>
            <h1 className="mr-auto mb-4 font-semibold text-xl">Customer Reviews</h1>
            <form>{review}</form>
        </figure>
    )
}
