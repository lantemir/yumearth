import React , {useState, useEffect, useRef } from "react";
import styles from './Paginator.module.css';
import cn from "classnames";  // npm install classnames //  classNames= {cn(styles.paginator, styles.selectedPages)}
                                  // classNames= {cn(styles.paginator, [styles.selectedPages]: true)}


let Paginator = ({totalCount, pageSize, currentPage, onPageChanged, portionSize = 2}) => {

    


    // console.log("Paginator");
    // console.log(totalCount)
    // console.log(pageSize)
    
    // console.log(currentPage)
    // console.log(portionSize)
    // console.log("paginator")

    const next = "ещё"
    const prev = "назад"

    let pagesCount = Math.ceil(totalCount / pageSize); //   12/3 = 4


    const prevPagesLengthRef = useRef(null);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    // console.log(pages) //  pages 4

    

    let portionCount = Math.ceil(pagesCount / portionSize); //4
    let [portionNumber, setportionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; //1
    let rightPortionPageNumber = portionNumber * portionSize // 2

    // console.log(leftPortionPageNumber)
    // console.log('leftPortionPageNumber')
    // console.log('---')

    // console.log(rightPortionPageNumber)
    // console.log('rightPortionPageNumber')

 

    useEffect(() => {

     
        if (prevPagesLengthRef.current !== null && pages.length !== prevPagesLengthRef.current ){

            // console.log('Старое значение:', prevPagesLengthRef.current);
            // console.log('Новое значение:', pages.length);
            setportionNumber(1)
            onPageChanged(1)
           
            
            
        }

        prevPagesLengthRef.current = pages.length;
                    

    }, [pages])

    return <div className={styles.paginator}>
        {console.log("return pagination")}
        
        {portionNumber > 1  &&
            <button onClick={ () => { 
                setportionNumber(portionNumber - 1)
                onPageChanged(leftPortionPageNumber-1)
                }}>{prev}</button>}

                {pages 
                     .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber )
                        .map(p =>{
                            return <span className={ cn ({
                                [styles.selectedPage]: currentPage === p 
                            }, styles.pageNumber)}
                                key={p}
                                onClick={(e) => {
                                    onPageChanged(p);
                                }}>{p}</span>                            
                        })}
                {portionCount > portionNumber &&
                    <button onClick={() =>{
                        setportionNumber(portionNumber + 1 )
                        console.log(rightPortionPageNumber+1)
                        onPageChanged(rightPortionPageNumber+1)
                        }}>{next}</button> }
                    
    </div>
}

export default Paginator