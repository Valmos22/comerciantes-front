import { Button } from 'antd';
import { useEffect } from 'react';

const PaginationControl = ({ currentPage, setCurrentPage, totalPage }) => {

    useEffect(() => {
        setCurrentPage(1);
    }, [setCurrentPage, totalPage]);

    return (
        <>
            <div className="flex justify-center items-center mt-4">
                <Button
                    type="primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{ marginRight: 10 }}
                >
                    Anterior
                </Button>
                <span className="block text-center text-sm" >{currentPage} de {totalPage}</span>
                <Button
                    type="primary"
                    disabled={currentPage === totalPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{ marginLeft: 10 }}
                >
                    Siguiente
                </Button>
            </div>
        </>
    )
}
export default PaginationControl