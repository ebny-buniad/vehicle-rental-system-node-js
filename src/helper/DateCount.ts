const dateCount = (endDate: string, startDate: string) => {
    const end = new Date(endDate as string);
    const start = new Date(startDate as string);
    const date = end.getTime() - start.getTime();
    const diffDate = Math.ceil(date / (1000 * 60 * 60 * 24));
    return diffDate;
}

export default dateCount;